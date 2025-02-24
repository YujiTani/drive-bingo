import { useState, useEffect } from "react"

/**
 * 地図の初期化に必要なprops
 * @param userCurrentLocation ユーザーの現在位置
 * @param zoom 地図のズーム
 * @param mapId 地図の識別子
 */
export type useInitMapProps = {
    userCurrentLocation: google.maps.LatLngLiteral
    zoom: number
    mapId: string
  }

/**
 * 地図の初期化
 * @param userCurrentLocation ユーザーの現在位置
 * @param zoom 地図のズーム
 * @param mapId 地図のID
 * @returns map
 */
export const useInitMap = ({ userCurrentLocation, zoom, mapId }: useInitMapProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!container) return

    const newMap = new google.maps.Map(container, {
      center: userCurrentLocation,
      zoom,
      disableDefaultUI: true,
      mapId,
    })
    setMap(newMap)

    return () => {
      newMap.unbindAll()
      setMap(null)
    }
  }, [container, userCurrentLocation, zoom, mapId])

  return {
    map,
    setContainer,
  }
}

export default useInitMap
