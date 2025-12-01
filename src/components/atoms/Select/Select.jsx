import styles from './Select.module.css';

const Select = ({ 
    id,
    name,
    value,
    onChange,
    children,
    className = '',
    error = false,
    ...props
}) => {
    return (
        <select
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`${styles.select} ${error ? styles.inputError : ''} ${className}`}
            {...props}
        >
            {children}
        </select>
    );
};

export default Select;

