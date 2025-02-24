'use client'

import MapView from "@/components/MapView";
import { useState } from "react";

export default function Home() {
  const [showMapView, setShowMapView] = useState(false);
  const [userCurrentLocation, setUserCurrentLocation] = useState<google.maps.LatLngLiteral>({
    lat: 35.69575,
    lng: 139.77521
  });

  const handleClick = () => {
    handleGeolocation();
    setShowMapView(true);
  }

  // ユーザーの現在地を取得する
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            alert('位置情報の利用がブロックされました。設定から許可してください。\n' +
                  '（設定方法例）\n' +
                  'Chrome: ⋮ > 設定 > プライバシーとセキュリティ > サイトの設定 > 位置情報\n' +
                  'Safari: 設定 > プライバシー > 位置情報サービス');
          }
          setShowMapView(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('このブラウザは位置情報サービスをサポートしていません');
    }
  }
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">ドライブビンゴ</h1>
      <button
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       onClick={handleClick}
     >
      目的地を設定
     </button>
     {showMapView && (
      <MapView userCurrentLocation={userCurrentLocation} />
     )}
    </main>
  );
}
