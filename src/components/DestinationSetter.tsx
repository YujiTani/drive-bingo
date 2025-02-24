import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';

import GoogleMapLoader from './GoogleMapLoader';
import GoogleMapRenderer from './GoogleMapRenderrer';

/**
 * 目的地を設定するコンポーネント
*/
const DestinationSetter = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  // TODO: ユーザーの現在地を取得するロジックに変更する
  const initialMapCenter = {
    lat: 35.69575,
    lng: 139.77521,
  }

  if (!apiKey) {
    console.error("Google Maps API Key is not set");
    return null;
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Wrapper apiKey={apiKey} render={GoogleMapLoader} >
        <GoogleMapRenderer center={initialMapCenter} zoom={10} />
      </Wrapper>
    </div>
  )
}

export default DestinationSetter
