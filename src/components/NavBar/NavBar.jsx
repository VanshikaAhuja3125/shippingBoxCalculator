import { Link, useLocation } from 'react-router-dom';
import { config } from '../../utils/config';
import styles from './Navbar.module.css';

const Navbar = () => {
    // Get current route location to highlight active link
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <h1 className={styles.logo}>📦 {config.appName}</h1>
                <div className={styles.navLinks}>
                    <Link
                        to="/add"
                        className={`${styles.navLink} ${location.pathname === '/add' || location.pathname === '/' ? styles.active : ''}`}
                    >
                        Add Box
                    </Link>
                    <Link
                        to="/list"
                        className={`${styles.navLink} ${location.pathname === '/list' ? styles.active : ''}`}
                    >
                        View Boxes
                    </Link>
                </div>
            </div>
        </nav>
    )
};

export default Navbar;