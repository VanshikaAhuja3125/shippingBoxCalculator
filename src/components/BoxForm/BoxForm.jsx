import { useState } from "react";
import { useBoxContext } from "../../context/BoxContext";
import { useToastContext } from '../../context/ToastContext';
import { getCountries, RECEIVER_NAME_MAX_LENGTH } from "../../utils/constants";
import { convertHexToRGB } from "../../services/shippingService";
import styles from './BoxForm.module.css';


const BoxForm = () => {
    const { addBox } = useBoxContext();
    const { showToast } = useToastContext();
    const countries = getCountries();

    // Form state - stores all input values
    const [formData, setFormData] = useState({
        receiverName: '',
        weight: '',
        color: '#ffffff',
        country: '',
    });

    // Error state - stores validation errors
    const [errors, setErrors] = useState({});

    // Updates formData when user types/selects
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Special handling for receiver name - check character limit
        if (name === 'receiverName') {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));

            if (value?.length > RECEIVER_NAME_MAX_LENGTH) {
                setErrors((prev) => ({
                    ...prev,
                    receiverName: `Receiver name cannot exceed ${RECEIVER_NAME_MAX_LENGTH} characters.`,
                }));
                showToast(`Receiver name cannot exceed ${RECEIVER_NAME_MAX_LENGTH} characters.`, 'error');
                const truncatedValue = value.substring(0, RECEIVER_NAME_MAX_LENGTH);
                setFormData((prev) => ({
                    ...prev,
                    [name]: truncatedValue,
                }));
                return;
            } else if (value?.length === RECEIVER_NAME_MAX_LENGTH) {
                setErrors((prev) => ({
                    ...prev,
                    receiverName: `Maximum ${RECEIVER_NAME_MAX_LENGTH} characters reached.`,
                }));
                showToast(`Maximum ${RECEIVER_NAME_MAX_LENGTH} characters reached.`, 'info');
            } else {
                if (errors.receiverName) {
                    setErrors((prev) => ({
                        ...prev,
                        receiverName: '',
                    }));
                }
            }
            return;
        }

        // Special handling for weight field - check for negative values
        if (name === 'weight' && value !== '') {
            const weightValue = parseFloat(value);
            if (weightValue < 0) {
                setErrors((prev) => ({
                    ...prev,
                    weight: 'Weight cannot be negative. Defaulting to 0.',
                }));
                showToast('Weight cannot be negative. Defaulting to 0.', 'error');
                setFormData((prev) => ({
                    ...prev,
                    weight: '0',
                }));
                return;
            }
        }

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear error for this field when user types correctly
        if (errors?.[name] &&
            !(name === 'weight' && parseFloat(value) < 0) &&
            !(name === 'receiverName' && value?.length > RECEIVER_NAME_MAX_LENGTH)) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    // Validate form data - Checks all required fields and weight validation
    const validateForm = () => {
        const newErrors = {};

        // Check receiver name
        if (!formData?.receiverName?.trim()) {
            newErrors.receiverName = 'Receiver name is required';
        } else if (formData?.receiverName?.length > RECEIVER_NAME_MAX_LENGTH) {
            newErrors.receiverName = `Receiver name cannot exceed ${RECEIVER_NAME_MAX_LENGTH} characters.`;
            showToast(`Receiver name cannot exceed ${RECEIVER_NAME_MAX_LENGTH} characters.`, 'error');
        }

        // Check weight
        if (!formData?.weight) {
            newErrors.weight = 'Weight is required';
        } else {
            const weightValue = parseFloat(formData?.weight);
            if (weightValue < 0) {
                newErrors.weight = 'Weight cannot be negative. Defaulting to 0.';
                setFormData((prev) => ({ ...prev, weight: '0' }));
                showToast('Weight cannot be negative. Defaulting to 0.', 'error');
            }
        }

        // Check country
        if (!formData?.country) {
            newErrors.country = 'Destination country is required';
        }

        setErrors(newErrors);

        // Show error toast if validation fails
        if (Object.keys(newErrors).length > 0) {
            showToast('Please fill all required fields correctly.', 'error');
        }

        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const rgbColor = convertHexToRGB(formData.color);

        const boxData = {
            receiverName: formData?.receiverName?.trim(),
            weight: parseFloat(formData?.weight),
            color: rgbColor,
            country: formData?.country
        };

        addBox(boxData);

        // Reset form after successful submission
        setFormData({
            receiverName: '',
            weight: '',
            color: '#ffffff',
            country: '',
        });

        setErrors({});

        showToast('Box added successfully!', 'success');
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Add New Shipping Box</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
                {/* Receiver Name Field */}
                <div className={styles.formGroup}>
                    <div className={styles.labelWrapper}>
                        <label htmlFor="receiverName" className={styles.label}>
                            Receiver Name <span className={styles.required}>*</span>
                        </label>
                        <span
                            className={`${styles.charCount} ${formData?.receiverName?.length > RECEIVER_NAME_MAX_LENGTH
                                    ? styles.error
                                    : formData?.receiverName?.length >= RECEIVER_NAME_MAX_LENGTH * 0.9
                                        ? styles.warning
                                        : ''
                                }`}
                        >
                            {formData?.receiverName?.length}/{RECEIVER_NAME_MAX_LENGTH}
                        </span>
                    </div>
                    <input
                        type="text"
                        id="receiverName"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.receiverName ? styles.inputError : ''}`}
                        placeholder="Enter receiver name"
                    />
                    {errors.receiverName && (
                        <span className={styles.error}>{errors.receiverName}</span>
                    )}
                </div>


                {/* Weight Field */}
                <div className={styles.formGroup}>
                    <label htmlFor="weight" className={styles.label}>
                        Weight (kg) <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        value={formData.weight}
                        onChange={handleChange}
                        onBlur={(e) => {
                            const weightValue = parseFloat(e.target.value);
                            if (weightValue < 0) {
                                setErrors((prev) => ({
                                    ...prev,
                                    weight: 'Weight cannot be negative. Defaulting to 0.',
                                }));
                                // Show error toast
                                showToast('Weight cannot be negative. Defaulting to 0.', 'error');
                                setFormData((prev) => ({
                                    ...prev,
                                    weight: '0',
                                }));
                            }
                        }}
                        min="0"
                        step="0.01"
                        className={`${styles.input} ${errors.weight ? styles.inputError : ''}`}
                        placeholder="Enter weight in kilograms"
                    />
                    {errors.weight && (
                        <span className={styles.error}>{errors.weight}</span>
                    )}
                </div>

                {/* Box Color Field */}
                <div className={styles.color}>
                    <label htmlFor="color" className={styles.label}>
                        Box Color <span className={styles.required}>*</span>
                    </label>
                    <div className={styles.colorInputWrapper}>
                        <input
                            type="color"
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className={styles.colorInput} />
                        <span className={styles.colorValue}>
                            RGB: ({convertHexToRGB(formData.color)})
                        </span>
                    </div>
                </div>

                {/* Destination Country Field */}
                <div className={styles.formGroup}>
                    <label htmlFor="country" className={styles.label}>
                        Destination Country <span className={styles.required}>*</span>
                    </label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`${styles.select} ${errors.country ? styles.inputError : ''}`}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>

                    {errors.country && (
                        <span className={styles.error}>{errors.country}</span>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>
                    Save box
                </button>
            </form>
        </div>
    )

}

export default BoxForm