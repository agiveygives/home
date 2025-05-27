import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './FlashPlayer.module.css';
import { Button } from 'react95';

function FlashPlayer({ src }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleFullscreenChange = useCallback(() => {
    const isFullscreen =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    setFullscreen(isFullscreen);
  }, []);

  useEffect(() => {
    // Add listeners for all fullscreen change event variants
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      // Clean up
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
    };
  }, [handleFullscreenChange]);

  useEffect(() => {
    if (loaded) return;

    const ruffle = window.RufflePlayer?.newest() || window.RufflePlayer?.createPlayer();
    const container = containerRef.current;

    if (container && ruffle) {
      container.innerHTML = '';
      const player = ruffle.createPlayer();
      player.style.width = '100%';
      player.style.height = '100%';
      container.appendChild(player);
      player.load(src);
      playerRef.current = player;
      setLoaded(true);
    }
  }, [src, loaded]);

  const enterFullscreen = () => {
    const container = containerRef.current;

    setFullscreen(true);

    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    const container = containerRef.current;

    setFullscreen(false);

    if (container.exitFullscreen) {
      container.exitFullscreen();
    } else if (container.webkitExitFullscreen) {
      container.webkitExitFullscreen();
    } else if (container.mozExitFullScreen) {
      container.mozExitFullScreen();
    } else if (container.msExitFullscreen) {
      container.msExitFullscreen();
    }
  };

  return (
    <div className={classNames(styles.container, { [styles.fullscreen]: fullscreen })}>
      <div ref={containerRef} className={classNames(styles.playerContainer)} />
      <div className={classNames(styles.playerControls, { [styles.hidden]: fullscreen })}>
        <Button onClick={enterFullscreen} className={styles.fullscreenBtn}>
          Fullscreen
        </Button>
      </div>
        <Button
          className={classNames(styles.exitFullscreenBtn, { [styles.hidden]: !fullscreen })}
          onClick={exitFullscreen}
        >
          X
        </Button>
    </div>
  );
}

FlashPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default FlashPlayer;
