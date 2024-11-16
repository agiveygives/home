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
    <div>
      <a href={href} className={styles.container} target="_blank" rel="noreferrer">
        <img
          src={icon}
          alt={alt}
          className={styles.icon}
        />
        <div>{label}</div>
      </a>
    </div>
  )
};

DesktopIcon.propTypes = propTypes;

export default DesktopIcon;
