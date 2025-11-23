type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label?: string; hint?: string };
export function Input({label, hint, className="", ...rest}: InputProps){
  return (
    <label className="block space-y-1.5">
      {label && <span className="text-sm text-neutral-300">{label}</span>}
      <input {...rest} className={`input ${className}`} />
      {hint && <span className="text-xs text-neutral-500">{hint}</span>}
    </label>
  );
}
