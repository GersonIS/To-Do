import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="relative bg-gray-800 text-white w-full max-w-lg p-8 rounded-lg shadow-xl">
        {/* Botón de cierre "X" en la esquina superior derecha */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 focus:outline-none"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {/* Contenido del modal */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
