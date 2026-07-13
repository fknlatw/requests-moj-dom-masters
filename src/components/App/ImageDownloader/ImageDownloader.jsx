import { useContext, useState } from "react";
import { Button } from "../../UI/Button/Button.jsx";
import { MdFileDownload } from "react-icons/md";
import { MessageContext } from "../../../context/MessageContext.jsx";

export const ImageDownloader = ({ imageUrl, fileName, ...props }) => {
  const { setMessage, message } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const handleDownload = async () => {
    if (!imageUrl) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://mojdomrequests.linkpc.net/getImage.php?url=${imageUrl}`
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName || "download.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      setMessage({
        type: "success",
        text: "Фото загружено",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Ошибка загрузки фото",
      });
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button loading={loading} {...props} onClick={handleDownload}>
      <MdFileDownload />
    </Button>
  );
};
