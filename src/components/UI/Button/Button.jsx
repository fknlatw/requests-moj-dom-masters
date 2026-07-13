import s from "./button.module.css";
import { ImSpinner9 } from "react-icons/im";

export const Button = ({
  loading = false,
  editing = false,
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      {...props}
      disabled={loading || editing}
      className={`${s.button} ${className}`}
    >
      {loading ? <div className={s.spinnerWrapper}><ImSpinner9 /></div> : children}
    </button>
  );
};
