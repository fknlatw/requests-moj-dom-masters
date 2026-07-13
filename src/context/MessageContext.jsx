import { createContext , useState, useEffect, useRef} from "react";

const defaultMessage = {
  type: "",
  text: "",
};

export const MessageContext = createContext(null);

export const MessageProvider = ({children}) => {

  const [message, setMessage] = useState(defaultMessage);
  const timerRef = useRef(null);


  useEffect(() => {
    if(timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if(message.text) {
      timerRef.current = setTimeout(() => {
        setMessage(defaultMessage);
      }, 2000);
    }

    return () => {
      if(timerRef.current) {
        clearTimeout(timerRef.current);
      }
    }
  }, [message.text]);
  

  const value = {
    message,
    setMessage
  }

  return <MessageContext.Provider value={value}>
    {children}
  </MessageContext.Provider>
}