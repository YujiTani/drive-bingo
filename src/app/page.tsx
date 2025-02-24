'use client'

import MapView from "@/components/DestinationSetter";
import { useState } from "react";

export default function Home() {
  const [showDestinationSetter, setShowDestinationSetter] = useState(false);

  const handleDestinationSetterOpen = () => {
    setShowDestinationSetter(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">ドライブビンゴ</h1>
      {/* ボタンをクリックするとGoogle Mapsに遷移します */}
      <button
       className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
       onClick={handleDestinationSetterOpen}
     >
      目的地を設定
     </button>
     {showDestinationSetter && (
      <MapView />
     )}
    </main>
  );
}
