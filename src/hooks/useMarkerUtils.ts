import { useCallback } from 'react';

type MarkerStyleOptions = {
  color?: string;
  size?: number;
  animation?: string;
};

const useMarkerUtils = () => {
  const createCustomPin = useCallback((options: MarkerStyleOptions = {}) => {
    const {
      color = '#FF5733',
      size = 40,
      animation = 'animate-bounce'
    } = options;

    const pin = document.createElement('div');
    pin.innerHTML = `
      <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
      </svg>
    `;
    pin.className = `${animation} gmp-clickable`;
    return pin;
  }, []);

  return { createCustomPin };
};

export default useMarkerUtils; 
