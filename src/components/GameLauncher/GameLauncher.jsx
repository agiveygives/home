import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Window,
  WindowContent,
  WindowHeader
} from 'react95';
import classNames from 'classnames';
import styles from './GameLauncher.module.css';
import FlashPlayer from '../FlashPlayer/FlashPlayer';

const GameLaunch = ({ isOpen, closeWindow }) => {
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
        <span>Papa's Cheeseria</span>
        <Button onClick={closeWindow}>X</Button>
      </WindowHeader>
      <WindowContent>
        <div>
          <FlashPlayer src="/games/papas_cheeseria/papascheeseria_102.swf" />
        </div>
      </WindowContent>
    </Window>
  );
};

GameLaunch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeWindow: PropTypes.func.isRequired,
};

export default GameLaunch;
