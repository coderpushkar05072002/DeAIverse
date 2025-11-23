type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid"|"outline"; };
export function Button({ variant="solid", className="", ...props }: ButtonProps){
  const base = variant==="solid" ? "btn" : "btn btn-outline";
  return <button {...props} className={`${base} ${className}`} />;
}
