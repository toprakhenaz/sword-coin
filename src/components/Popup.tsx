import { useEffect } from 'react';

interface PopupProps {
  title: string;
  message: string;
  image: string;
  onClose: () => void;
}

export default function Popup({ title, message, image, onClose }: PopupProps) {
  // Sayfa açıldıktan sonra ESC tuşu ile pop-up kapatılabilmesi için
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg relative w-96 max-w-full text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#10005;
        </button>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{message}</p>
        <img src={image} alt="Lig resmi" className="mx-auto mb-4 w-32 h-32 object-contain" />
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Tamam
        </button>
      </div>
    </div>
  );
}
