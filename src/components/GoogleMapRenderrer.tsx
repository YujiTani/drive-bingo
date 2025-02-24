import React from 'react';

/**
 * GoogleMapを描画するコンポーネントのprops
 * @param center 地図の中心
 * @param zoom 地図のズーム
 */
export type GoogleMapRendererProps = {
    center: google.maps.LatLngLiteral;
    zoom: number;
  }
  
  /**
   * GoogleMapを描画するコンポーネント
   * @param center 地図の中心
   * @param zoom 地図のズーム
   */
  const GoogleMapRenderer = ({ center, zoom }: GoogleMapRendererProps) => {
      const ref = React.useRef<HTMLDivElement>(null);
    
      // マップインスタンスを状態管理
      const [map, setMap] = React.useState<google.maps.Map | null>(null);
    
      React.useEffect(() => {
        if (ref.current && !map) {
          const newMap = new window.google.maps.Map(ref.current, {
            center,
            zoom,
            disableDefaultUI: true,  // デフォルトUI非表示
            gestureHandling: "greedy" // タッチ操作最適化
          });
          setMap(newMap);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
      return <div ref={ref} style={{ height: '100%', width: '100%' }} />;
  };

export default GoogleMapRenderer