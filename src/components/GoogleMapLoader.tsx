import { Status } from "@googlemaps/react-wrapper"

/**
 * 地図の描画状態に応じた状態表示コンポーネント
 * @param status 地図の描画状態
 */
const GoogleMapLoader = (status: Status) => {
    return (
      <div className="p-4 rounded-lg bg-gray-50 flex items-center gap-3">
        {status === 'LOADING' ? (
          <>
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <h1 className="text-lg font-semibold">地図を読み込み中...</h1>
          </>
        ) : status === 'SUCCESS' ? (
          <>
            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <h1 className="text-lg font-semibold">地図の読み込みに成功しました</h1>
          </>
        ) : (
          <>
            <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h1 className="text-lg font-semibold">地図の読み込みに失敗しました</h1>
              <p className="text-sm text-gray-600">通信環境を確認して再試行してください</p>
            </div>
          </>
        )}
      </div>
    )
  }

export default GoogleMapLoader