import styles from './Label.module.css';

const Label = ({ htmlFor, children, className = '' }) => {
    return (
        <label htmlFor={htmlFor} className={`${styles.label} ${className}`}>
            {children}
        </label>
    );
};

export default Label;

