import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

import GoogleMapLoader from './GoogleMapLoader';
import GoogleMapRenderer from './GoogleMapRenderrer';

/**
 * GoogleMapを表示するコンポーネント
*/
const MapView = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // TODO: ユーザーの現在地を取得するロジックに変更する
  const userCurrentLocation = {
    lat: 35.69575,
    lng: 139.77521,
  }
  const zoom = 10

  if (!apiKey) {
    console.error("Google Maps API Key is not set");
    return null;
  }
  
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Wrapper apiKey={apiKey} render={GoogleMapLoader} >
        <GoogleMapRenderer userCurrentLocation={userCurrentLocation} zoom={zoom} />
      </Wrapper>
    </div>
  )
}

export default MapView
