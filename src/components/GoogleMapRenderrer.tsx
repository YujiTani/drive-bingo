import { useEffect, useRef, useState } from 'react'

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

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      setContainer(mapRef.current)
    }
  }, [mapRef, setContainer])

  useEffect(() => {
    if (!map) return;
  
    // Google Maps APIのネイティブクリックイベントを使用
    const clickListener = map.addListener('click', (e) => {
      if (e.latLng) {
        setSelectedLocation({
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        });
        setShowConfirmation(true);
      }
    });
  
    // ダブルクリックイベントの無効化
    map.setOptions({
      disableDoubleClickZoom: true,
      gestureHandling: 'cooperative'
    });
  
    return () => {
      google.maps.event.removeListener(clickListener);
    };
  }, [map]);

  return (
    <>
      <div 
        ref={mapRef} 
        style={{ height: '100%', width: '100%' }}
      />
      
      {showConfirmation && selectedLocation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">目的地の確認</h3>
            <p className="mb-4">
              この位置を目的地に設定しますか？
              <br />
              緯度: {selectedLocation.lat.toFixed(5)}
              <br />
              経度: {selectedLocation.lng.toFixed(5)}
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  // ここに確定処理を追加
                  setShowConfirmation(false);
                }}
                className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
              >
                確定
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GoogleMapRenderer
