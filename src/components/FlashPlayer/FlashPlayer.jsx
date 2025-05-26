import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

function FlashPlayer({ src, width = 800, height = 600 }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

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

  return (
    <div style={{ position: 'relative', width, height }}>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
      />
      <button
        onClick={enterFullscreen}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          zIndex: 10,
          padding: '8px 12px',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        Fullscreen
      </button>
    </div>
  );
}

FlashPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default FlashPlayer;
