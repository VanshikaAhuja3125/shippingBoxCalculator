import styles from './ErrorMessage.module.css';

const ErrorMessage = ({ children, className = '' }) => {
    if (!children) return null;
    
    return (
        <span className={`${styles.error} ${className}`}>
            {children}
        </span>
    );
};

export default ErrorMessage;

