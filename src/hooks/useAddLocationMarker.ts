import { useEffect } from 'react'

import useMarkerUtils from '@/hooks/useMarkerUtils'

/**
 * カスタムマーカーのprops
 * @params.map 地図インスタンス
 * @params.userCurrentLocation ユーザーの現在地座標
 * // TODO: 目的地座標も取得できるようにする
 */
export type useAddLocationMarkerProps = {
  map: google.maps.Map | null
  userCurrentLocation: google.maps.LatLngLiteral
}

/**
 * GoogleMapに表示するカスタムマーカーを生成
 * @returns カスタムマーカー
 */
export const useAddLocationMarker = ({ map, userCurrentLocation }: useAddLocationMarkerProps) => {
  const { createCustomPin } = useMarkerUtils()

  useEffect(() => {
    const initializeMarker = async () => {
      const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary

      new AdvancedMarkerElement({
        map,
        position: userCurrentLocation,
        content: createCustomPin({
          color: '#4285F4',
          size: 48,
          animation: 'animate-bounce'
        }),
        gmpClickable: true
      })
      // クリックイベントを追加
      .addListener('click', () => {
        alert('Marker clicked!');
      });
    }

    initializeMarker()
  }, [map, userCurrentLocation, createCustomPin])
}

export default useAddLocationMarkerProps
