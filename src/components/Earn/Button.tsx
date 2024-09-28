import { ButtonProps } from "@/types";

export const Button: React.FC<ButtonProps> = ({ className, children, ...props }) => (
  <button className={`px-4 py-2 rounded ${className}`} {...props}>
    {children}
  </button>
);
