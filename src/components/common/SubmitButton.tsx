export function SubmitButton({
  label,
  isLoading = false,
  big = false,
  onClick = () => undefined,
}: {
  label: string;
  isLoading?: boolean;
  big?: boolean;
  onClick?: (_: any) => void;
}) {
  const btnClass = big ? 'btn btn-primary w-full' : 'btn btn-primary btn-sm';

  return (
    <>
      {isLoading ? (
        <button type="submit" className={btnClass} onClick={onClick} disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          {` ${label}`}
        </button>
      ) : (
        <button type="submit" className={btnClass} onClick={onClick}>
          {label}
        </button>
      )}
    </>
  );
}

export default SubmitButton;
