import { Spinner } from 'react-bootstrap';

export function SubmitButton({
  label,
  isLoading = false,
  big = false,
  className = '',
  type = 'submit',
  onClick = () => undefined,
}: {
  label: string;
  isLoading?: boolean;
  big?: boolean;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: (_: any) => void;
}) {
  const btnClass = big
    ? `btn btn-primary w-full ${className}`
    : `btn btn-primary btn-sm ${className}`;

  return (
    <>
      {isLoading ? (
        <button type={type} className={btnClass} onClick={onClick} disabled>
          <Spinner size="sm" aria-hidden="true" />
          {` ${label}`}
        </button>
      ) : (
        <button type={type} className={btnClass} onClick={onClick}>
          {label}
        </button>
      )}
    </>
  );
}

export default SubmitButton;
