import AppLayout from '../../../components/AppLayout/AppLayout';
import DesktopIcon from '../../../components/DesktopIcon/DesktopIcon';
import styles from '../Desktop.module.css';
import DesktopLinks from './links';

const PersonalDesktop = () => {
  return (
    <AppLayout>
      <div className={styles.desktopContainer}>
        {
          DesktopLinks.map((desktopLink) => (
            <DesktopIcon {...desktopLink} key={desktopLink.href} />
          ))
        }
      </div>
    </AppLayout>
  );
};

export default PersonalDesktop;
