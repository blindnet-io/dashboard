export function SubmitButton({
  label,
  isLoading,
  big = false,
}: {
  label: string;
  isLoading: boolean;
  big?: boolean;
}) {
  const btnClass = big ? 'btn btn-primary w-full' : 'btn btn-primary btn-sm';

  return (
    <>
      {isLoading ? (
        <button type="submit" className={btnClass} disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {` ${label}`}
        </button>
      ) : (
        <button type="submit" className={btnClass}>
          {label}
        </button>
      )}
    </>
  );
}

export default SubmitButton;
