import { useEffect, useRef } from 'react'

import useInitMap from '@/hooks/useInitMap'
import { useAddLocationMarker } from '@/hooks/useAddLocationMarker'

/**
 * GoogleMapを描画するコンポーネントのprops
 * @param userCurrentLocation ユーザーの現在地
 * @param zoom 地図のズーム
 */
export type GoogleMapRendererProps = {
  userCurrentLocation: google.maps.LatLngLiteral
  zoom: number
}

/**
 * GoogleMapを描画するコンポーネント
 * @param userCurrentLocation ユーザーの現在地
 * @param zoom 地図のズーム
 */
const GoogleMapRenderer = ({ userCurrentLocation, zoom }: GoogleMapRendererProps) => {
  const mapId = 'DRIVE_BINGO_MAP'
  const mapRef = useRef<HTMLDivElement>(null)
  const { map, setContainer } = useInitMap({userCurrentLocation, zoom, mapId})
  useAddLocationMarker({map, userCurrentLocation})

  useEffect(() => {
    if (mapRef.current) {
      setContainer(mapRef.current)
    }
  }, [mapRef, setContainer])

  return (
    <div 
      ref={mapRef} 
      style={{ height: '100%', width: '100%' }}
    />
  )
}

export default GoogleMapRenderer
