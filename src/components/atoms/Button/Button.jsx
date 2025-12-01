import styles from './Button.module.css';

const Button = ({ 
    type = 'button',
    onClick,
    children,
    className = '',
    variant = 'primary',
    ...props
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`${styles.button} ${styles[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;

