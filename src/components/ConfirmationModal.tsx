interface ConfirmationModalProps {
  isOpen: boolean;
  location: google.maps.LatLngLiteral | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ 
  isOpen, 
  location, 
  onConfirm, 
  onCancel 
}) => {
  if (!isOpen || !location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">目的地の確認</h3>
        <p className="mb-4">
          この位置を目的地に設定しますか？
          <br />
          緯度: {location.lat.toFixed(5)}
          <br />
          経度: {location.lng.toFixed(5)}
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  );
}; 