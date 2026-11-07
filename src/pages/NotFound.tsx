import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';
import styles from './NotFound.module.css';

const NotFound = () => {
  useEffect(() => {
    document.title = "404 - Page Not Found | CEGS";
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.desc}>
          The page you are looking for might have been moved, renamed, or is temporarily unavailable.
        </p>
        <div className={styles.actions}>
          <Link to="/" className={styles.primaryBtn}>
            <Home size={16} /> Return Home
          </Link>
          <Link to="/services" className={styles.secondaryBtn}>
            <Compass size={16} /> Explore Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
