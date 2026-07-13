import s from "./input.module.css";

export const Input = ({className, ...props}) => {
  return (
    <input className={`${className} ${s.input}`} {...props}/>
  )
}
