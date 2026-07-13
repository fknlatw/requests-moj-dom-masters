import s from "./maintitle.module.css";

export const MainTitle = ({ className = "", children, ...props }) => {
  return (
    <h1 {...props} className={`${s.title} ${className}`}>
      {children}
    </h1>
  );
};
