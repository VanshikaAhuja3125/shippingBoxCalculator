import styles from './Input.module.css';

const Input = ({ 
    type = 'text',
    id,
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    min,
    step,
    className = '',
    error = false,
    ...props
}) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            min={min}
            step={step}
            className={`${styles.input} ${error ? styles.inputError : ''} ${className}`}
            {...props}
        />
    );
};

export default Input;

