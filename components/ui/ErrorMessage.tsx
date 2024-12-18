const ErrorMessage = ({ error }: { error: string }) =>
  error ? (
    <div className="w-full max-w-lg mx-auto mb-2 p-6">
      <div className="alert alert-error">{error}</div>
    </div>
  ) : null;

export default ErrorMessage;