import { useState } from "react";
import { useBoxContext } from "../../context/BoxContext";
import { useToastContext } from '../../context/ToastContext';
import { getCountries, RECEIVER_NAME_MAX_LENGTH } from "../../utils/constants";
import { convertHexToRGB } from "../../services/shippingService";
import Label from '../atoms/Label/Label';
import Input from '../atoms/Input/Input';
import Select from '../atoms/Select/Select';
import Button from '../atoms/Button/Button';
import ErrorMessage from '../atoms/ErrorMessage/ErrorMessage';
import styles from './BoxForm.module.css';


const BoxForm = () => {
    const { addBox } = useBoxContext();
    const { showToast } = useToastContext();
    const countries = getCountries();

    const [formData, setFormData] = useState({
        receiverName: '',
        weight: '',
        color: '#ffffff',
        country: '',
    });

    const [errors, setErrors] = useState({});

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

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors?.[name] &&
            !(name === 'weight' && parseFloat(value) < 0) &&
            !(name === 'receiverName' && value?.length > RECEIVER_NAME_MAX_LENGTH)) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData?.receiverName?.trim()) {
            newErrors.receiverName = 'Receiver name is required';
        } else if (formData?.receiverName?.length > RECEIVER_NAME_MAX_LENGTH) {
            newErrors.receiverName = `Receiver name cannot exceed ${RECEIVER_NAME_MAX_LENGTH} characters.`;
            showToast(`Receiver name cannot exceed ${RECEIVER_NAME_MAX_LENGTH} characters.`, 'error');
        }

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

        if (!formData?.country) {
            newErrors.country = 'Destination country is required';
        }

        setErrors(newErrors);

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
                <div className={styles.formGroup}>
                    <div className={styles.labelWrapper}>
                        <Label htmlFor="receiverName">
                            Receiver Name <span className={styles.required}>*</span>
                        </Label>
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
                    <Input
                        type="text"
                        id="receiverName"
                        name="receiverName"
                        value={formData.receiverName}
                        onChange={handleChange}
                        placeholder="Enter receiver name"
                        error={!!errors.receiverName}
                    />
                    {errors.receiverName && (
                        <ErrorMessage>{errors.receiverName}</ErrorMessage>
                    )}
                </div>

                <div className={styles.formGroup}>
                    <Label htmlFor="weight">
                        Weight (kg) <span className={styles.required}>*</span>
                    </Label>
                    <Input
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
                                showToast('Weight cannot be negative. Defaulting to 0.', 'error');
                                setFormData((prev) => ({
                                    ...prev,
                                    weight: '0',
                                }));
                            }
                        }}
                        min="0"
                        step="0.01"
                        placeholder="Enter weight in kilograms"
                        error={!!errors.weight}
                    />
                    {errors.weight && (
                        <ErrorMessage>{errors.weight}</ErrorMessage>
                    )}
                </div>

                <div className={styles.color}>
                    <Label htmlFor="color">
                        Box Color <span className={styles.required}>*</span>
                    </Label>
                    <div className={styles.colorInputWrapper}>
                        <Input
                            type="color"
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                        />
                        <span className={styles.colorValue}>
                            RGB: ({convertHexToRGB(formData.color)})
                        </span>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <Label htmlFor="country">
                        Destination Country <span className={styles.required}>*</span>
                    </Label>
                    <Select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        error={!!errors.country}
                    >
                        <option value="">Select a country</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </Select>

                    {errors.country && (
                        <ErrorMessage>{errors.country}</ErrorMessage>
                    )}
                </div>

                <Button type="submit" variant="primary">
                    Save box
                </Button>
            </form>
        </div>
    )

}

export default BoxForm