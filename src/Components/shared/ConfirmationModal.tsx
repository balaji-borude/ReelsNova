import { X } from "lucide-react";

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6">
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900 p-5 sm:p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 
                     p-1 text-neutral-400 hover:text-white 
                     cursor-pointer rounded-full hover:bg-neutral-800"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="pr-8">
          <h2 className="text-lg sm:text-xl font-semibold text-white">
            {title}
          </h2>

          <p className="mt-2 text-sm sm:text-base leading-6 text-neutral-400">
            {message}
          </p>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto rounded-md border border-neutral-700 
                       px-4 py-2.5 text-sm text-neutral-300 
                       hover:bg-neutral-800 cursor-pointer"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="w-full sm:w-auto rounded-md bg-rose-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-600 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
