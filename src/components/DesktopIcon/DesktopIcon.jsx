import PropTypes from 'prop-types';
import styles from './DesktopIcon.module.css';

const propTypes = {
  icon: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

const DesktopIcon = ({ icon, label, href, alt }) => {
  return (
    <a href={href} className={styles.container}>
      <img
        src={icon}
        alt={alt}
        className={styles.icon}
      />
      <p>{label}</p>
    </a>
  )
};

DesktopIcon.propTypes = propTypes;

export default DesktopIcon;
