'use client'

// Google Maps APIを使用して目的地を設定するコンポーネント
import React from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';

const containerStyle = {
  width: '400px',
  height: '400px',
}

const center = {
  lat: 35.69575,
  lng: 139.77521,
}

const Render = (status: Status) => {
    return (
        <h1>{status}</h1>
    )
};

const DestinationSetter = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API Key is not set");
    return null;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Wrapper apiKey={apiKey} render={Render}>
        <GoogleMap center={center} zoom={10} />
      </Wrapper>
    </div>
  )
}

const GoogleMap = ({ center, zoom }) => {
    const ref = React.useRef<HTMLDivElement>(null);
  
    React.useEffect(() => {
      if (ref.current) {
        new window.google.maps.Map(ref.current, {
          center,
          zoom,
        });
      }
    }, [center, zoom]);
  
    return <div ref={ref} style={{ height: '100%', width: '100%' }} />;
};

export default DestinationSetter
