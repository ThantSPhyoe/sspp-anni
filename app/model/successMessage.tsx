interface SuccessMessageProps {
  isOpen: boolean;
  headerText: string;
  bodyText: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  isOpen,
  headerText,
  bodyText,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center p-6"
      onClick={onClose}
    >
      <div className="relative mx-5 px-6 py-6 rounded-3xl transition-all duration-300 ease-in-out bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 text-white text-2xl font-bold hover:text-yellow-200 z-20"
          onClick={onClose}
        >
          ×
        </button>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-center text-xl font-bold text-yellow-200 mb-4">{headerText}</h2>
          <p className="whitespace-pre-line text-white/90">{bodyText}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
