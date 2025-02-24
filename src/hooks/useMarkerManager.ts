import { useCallback, useEffect, useState } from 'react'

import useMarkerUtils, { MarkerStyleOptions } from '@/hooks/useMarkerUtils'

/**
 * カスタムマーカーのprops
 * @params.map 地図インスタンス
 * @params.location 座標
 */
export type useMarkerManagerProps = {
  map: google.maps.Map | null
  location: google.maps.LatLngLiteral
  markerId: string;
  options?: MarkerStyleOptions
}

/**
 * GoogleMapに表示するカスタムマーカーを生成
 * @returns カスタムマーカー
 */
export const useMarkerManager = () => {
  const { createCustomPin } = useMarkerUtils()
  const [markers, setMarkers] = useState<Map<string, google.maps.marker.AdvancedMarkerElement>>(new Map())

  const addMarker = useCallback(
    async({map, location, markerId, options}: useMarkerManagerProps) => {
      if(!map || markers.has(markerId)) return;
      const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary
      
      const newMarker = new AdvancedMarkerElement({
        map,
        position: location,
        content: createCustomPin(options),
        gmpClickable: true,
      })
      
      setMarkers(prev => new Map(prev).set(markerId, newMarker))
    },
    [markers, createCustomPin]
  )

  const removeMaker = useCallback((markerId: string) => {
    setMarkers((prev) => {
      const newMarkers = new Map(prev)
      const marker = newMarkers.get(markerId)
      if (marker) {
        marker.map = null
        newMarkers.delete(markerId)
      }
      return newMarkers
    })
  }, [])

  useEffect(() => {
    return () => {
      markers.forEach((marker) => {
        marker.map = null
      })
    }
  }, [markers])

  return { addMarker, removeMaker }
}

export default useMarkerManager
