import styles from './IconButton.module.css';

const IconButton = ({ 
    onClick,
    children,
    className = '',
    ariaLabel,
    variant = 'default',
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            className={`${styles.iconButton} ${styles[variant]} ${className}`}
            aria-label={ariaLabel}
            {...props}
        >
            {children}
        </button>
    );
};

export default IconButton;

