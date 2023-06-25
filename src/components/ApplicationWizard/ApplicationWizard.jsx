import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  GroupBox,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';
import classNames from 'classnames';
import styles from './ApplicationWizard.module.css';

const ApplicationWizard = ({ isOpen, closeWindow }) => {
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (event) => {
    event.preventDefault();
    setIsDragging(true);
    const { clientX, clientY } = event;
    const rect = dragRef.current.getBoundingClientRect();
    setOffset({ x: clientX - rect.left, y: clientY - rect.top });
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const { clientX, clientY } = event;
    setPosition({ x: clientX - offset.x, y: clientY - offset.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Window
      ref={dragRef}
      className={classNames(styles.container, { [styles.hidden]: !isOpen })}
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
      }}
    >
      <WindowHeader
        className={styles.windowTitle}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <span>Application Wizard</span>
        <Button onClick={closeWindow}>X</Button>
      </WindowHeader>
      <WindowContent>
        <p>
          Here be things that job applications will typically ask for.
        </p>

        <GroupBox label="Profile links" style={{ marginTop: '10px', }}>
          <div style={{ marginTop: '10px', }}>
            <Button
              onClick={() => {
                navigator.clipboard.writeText('https://www.linkedin.com/in/andrew-givens-464291127/')
              }}
            >
              Copy LinkedIn Profile
            </Button>
          </div>
          <div style={{ marginTop: '10px', }}>
            <Button
              onClick={() => {
                navigator.clipboard.writeText('https://github.com/agiveygives')
              }}
            >
              Copy Github Profile
            </Button>
          </div>
        </GroupBox>
      </WindowContent>
    </Window>
  );
};

ApplicationWizard.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeWindow: PropTypes.func.isRequired,
};

export default ApplicationWizard;
