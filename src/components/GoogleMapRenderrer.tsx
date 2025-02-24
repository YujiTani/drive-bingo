import { useEffect, useRef, useState } from 'react'

import useInitMap from '@/hooks/useInitMap'
import { useMarkerManager } from '@/hooks/useMarkerManager'
import ConfirmationModal from '@/components/ConfirmationModal'
import { MarkerStyleOptions } from '@/hooks/useMarkerUtils'

/**
 * GoogleMapを描画するコンポーネントのprops
 * @param userCurrentLocation ユーザーの現在地
 * @param zoom 地図のズーム
 */
export type GoogleMapRendererProps = {
  userCurrentLocation: google.maps.LatLngLiteral
  zoom: number
}

const options: MarkerStyleOptions[] = [
  {
    color: '#4285F4',
    size: 48,
    animation: 'animate-bounce'
  },
  {
    color: '#FF6B6B',
    size: 48,
    animation: 'animate-bounce'
  }
]

const IDs = {
  mapId: 'DRIVE_BINGO_MAP',
  currentMarkerId: 'userCurrentLocationMarker',
  selectedMarkerId: 'selectedLocationMarker',
}

/**
 * GoogleMapを描画するコンポーネント
 * @param userCurrentLocation ユーザーの現在地
 * @param zoom 地図のズーム
 */
const GoogleMapRenderer = ({ userCurrentLocation, zoom }: GoogleMapRendererProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const { map, setContainer } = useInitMap({ userCurrentLocation, zoom, mapId: IDs.mapId })
  const { addMarker, getMarker, updateMarker } = useMarkerManager()
  addMarker({ map, location: userCurrentLocation, markerId: IDs.currentMarkerId, options: options[0] })
  
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null)
  
  useEffect(() => {
    if (mapRef.current) {
      setContainer(mapRef.current)
    }
  }, [mapRef, setContainer])
  
  useEffect(() => {
    if (!map) return
    
    // Google Maps APIのネイティブクリックイベントを使用
    const clickListener = map.addListener('click', (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        setSelectedLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        })
        setShowConfirmation(true)
      }
    })
    
    // ダブルクリックイベントの無効化
    map.setOptions({
      disableDoubleClickZoom: true,
      gestureHandling: 'cooperative',
    })
    
    return () => {
      google.maps.event.removeListener(clickListener)
    }
  }, [map])
  
  const handleClickConfirmationModal = () => {
    if (!selectedLocation) return

    if (getMarker(IDs.selectedMarkerId)) {
      updateMarker({ location: selectedLocation, markerId: IDs.selectedMarkerId, options: options[1] })
    } else {
      addMarker({ map, location: selectedLocation, markerId: IDs.selectedMarkerId, options: options[1] })
    }

    setShowConfirmation(false)
  }
  
  return (
    <>
      <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      {showConfirmation && selectedLocation && (
        <ConfirmationModal
          isOpen={showConfirmation}
          location={selectedLocation}
          onConfirm={handleClickConfirmationModal}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </>
  )
}

export default GoogleMapRenderer
