interface AlertProps {
  message: string;
  onDismiss?: () => void;
}

export function Alert({ message, onDismiss }: AlertProps) {
  return (
    <div
      role="alert"
      className="flex items-start justify-between gap-4 rounded-md bg-red-50 p-4 ring-1 ring-inset ring-red-200"
    >
      <p className="text-sm font-medium text-red-800">{message}</p>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="text-sm font-medium text-red-500 hover:text-red-700"
        >
          Dismiss
        </button>
      )}
    </div>
  );
}
