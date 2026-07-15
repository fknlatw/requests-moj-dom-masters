import { useState, createContext, useRef, useContext, useEffect } from "react";
import { MessageContext } from "./MessageContext.jsx";
import { emptyChecker, toRussian } from "../utils/checker.js";
import { AuthContext } from "./AuthContext.jsx";
import {
  fieldsToCheck,
  defaultRequest,
  defaultLoadingStates,
} from "../constants/constants.js";
export const FirebaseContext = createContext();
import imageCompression from "browser-image-compression";

export const FirebaseProvider = ({ children }) => {
  //REACT ПЕРЕМЕННЫЕ
  const { message, setMessage } = useContext(MessageContext);
  const { getToken } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [loadingStates, setLoadingStates] = useState(defaultLoadingStates);
  const [isEditing, setIsEditing] = useState(false);

  const [requests, setRequests] = useState([]);

  const [request, setRequest] = useState(defaultRequest);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [editingRequest, setEditingRequest] = useState(defaultRequest);

  const fetchRequests = async () => {
    try {
      setLoadingStates({ ...loadingStates, getRequests: true });
      const response = await fetch(
        "https://mojdomrequests.linkpc.net/getRequests.php"
      );
      const data = await response.json();
      setRequests([...data]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStates({ ...loadingStates, getRequests: false });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  //ФУНКЦИИ
  const cancelEditing = () => {
    if (!isEditing) return;
    setEditingRequest(defaultRequest);
    if (photo) {
      setPhoto(null);
      setPhotoPreview(null);
      URL.revokeObjectURL(photoPreview);
    }
    setIsEditing(false);
  };

  const handleDelete = async (id, photoId) => {
    const token = await getToken();
    if (!token) return;
    //ПРОВЕРКА
    if (!id) {
      setMessage({
        text: "Не передан идентификатор",
        type: "error",
      });
      return;
    }
    //УДАЛЯЕМ КАРТИНКУ
    setLoadingStates({ ...loadingStates, deleteRequest: true });
    try {
      const response = await fetch(
        "https://mojdomrequests.linkpc.net/deletePhoto.php",
        {
          method: "DELETE",
          body: JSON.stringify({ id: photoId }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.text);
        error.type = data.type;
        throw error;
      }
    } catch (err) {
      setMessage({
        text: err.message,
        type: err.type,
      });
      setLoadingStates({ ...loadingStates, deleteRequest: false });
      return;
    }

    try {
      const response = await fetch(
        "https://mojdomrequests.linkpc.net/deleteRequest.php",
        {
          method: "DELETE",
          body: JSON.stringify({ id }),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        const error = new Error(data.text);
        error.type = data.type;
        throw error;
      }

      const newRequests = requests.filter((request) => request.id !== data.id);
      setRequests([...newRequests]);
      setMessage({
        type: data.type,
        text: data.text,
      });
    } catch (err) {
      setMessage({
        text: err.message,
        type: err.type,
      });
      setLoadingStates({ ...loadingStates, deleteRequest: false });
      return;
    }
    setLoadingStates({ ...loadingStates, deleteRequest: false });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isEditing) {
      setEditingRequest({
        ...editingRequest,
        [name]: value,
      });
    } else {
      setRequest({
        ...request,
        [name]: value,
      });
    }
  };

  const handleFileChange = async (e) => {
    const files = e.target.files;
  
    if (!files || files.length === 0) {
      setPhoto(null);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      return;
    }
  
    const file = files[0];
  
    try {
      // Сброс
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoPreview(null);
      setPhoto(null);
  
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 3,
        maxWidthOrHeight: 1000,
        quality: 0.9,
        useWebWorker: true,
        convertFormat: "image/jpeg",
      });
  
      if (!compressedFile) {
        setMessage({
          text: "Не удалось сжать изображение",
          type: "error",
        });
        return;
      }
  
      // ✅ Прямое переименование и установка
      const baseName = file.name.replace(/\.(png|webp|heic|heif|jpeg|jpg)$/i, "");
      const finalFile = new File([compressedFile], `${baseName}.jpg`, {
        type: "image/jpeg",
      });
  
      setPhoto(finalFile);
      const previewUrl = URL.createObjectURL(finalFile);
      setPhotoPreview(previewUrl);
  
      console.log("Успешно загружено:", finalFile.name, "Размер:", finalFile.size);
    } catch (error) {
      console.error("Ошибка в handleFileChange:", error);
      setMessage({
        text: "Ошибка при загрузке изображения: " + error.message,
        type: "error",
      });
      
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhoto(null);
      setPhotoPreview(null);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const token = await getToken();

    if (!token) return;

    let editRequestFields = { ...editingRequest };

    const emptyFields = emptyChecker(editRequestFields, fieldsToCheck);

    if (emptyFields.length > 0) {
      setMessage({
        type: "error",
        text: `Заполните поля:
        ${emptyFields
          .map((field) => {
            return `${toRussian(field)}, `;
          })
          .join("")}`,
      });
      return;
    }

    setLoadingStates({ ...loadingStates, editRequest: true });
    if (photo) {
      try {
        const response = await fetch(
          "https://mojdomrequests.linkpc.net/deletePhoto.php",
          {
            method: "DELETE",
            body: JSON.stringify({ id: editingRequest.photo.id }),
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          const error = new Error(data.text);
          error.type = data.type;
          throw error;
        }
        setMessage({
          text: data.text,
          type: data.type,
        });
      } catch (err) {
        setMessage({
          text: err.message,
          type: err.type,
        });
        setLoadingStates({ ...loadingStates, editRequest: false });
        return;
      }
      try {
        const formData = new FormData();
        formData.append("photo", photo);
        const response = await fetch(
          "https://mojdomrequests.linkpc.net/uploadPhoto.php",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();

        if (!response.ok) {
          const error = new Error(data.text);
          error.type = data.type;
          throw error;
        }

        editRequestFields.photo.link = data.data.link;
        editRequestFields.photo.id = data.data.id;
        setMessage({
          text: data.text,
          type: data.type,
        });
      } catch (err) {
        setMessage({
          text: err.message,
          type: err.type,
        });
        setLoadingStates({ ...loadingStates, editRequest: false });
        return;
      }
    }
    try {
      const formData = new FormData();
      formData.append("request", JSON.stringify(editRequestFields));
      const response = await fetch(
        "https://mojdomrequests.linkpc.net/editRequest.php",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error(data.text);
        error.type = data.type;
        throw error;
      }
      setMessage({
        text: data.text,
        type: data.type,
      });
    } catch (err) {
      setMessage({
        text: err.message,
        type: err.type,
      });
      setLoadingStates({ ...loadingStates, editRequest: false });
      return;
    }
    const newRequestsArray = requests.map((req) => {
      if (req.id === editRequestFields.id) {
        return editRequestFields;
      }
      return req;
    });
    setRequests(newRequestsArray);
    setIsEditing(false);
    setEditingRequest(defaultRequest);
    setPhoto(null);
    URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setLoadingStates({ ...loadingStates, editRequest: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage({ type: "", text: "" });

    const token = await getToken();

    if (!token) return;

    let newRequestFields = { ...request };

    const emptyFields = emptyChecker(newRequestFields, fieldsToCheck);

    if (emptyFields.length > 0) {
      setMessage({
        type: "error",
        text: `Заполните поля:
        ${emptyFields
          .map((field) => {
            return `${toRussian(field)}, `;
          })
          .join("")}`,
      });
      return;
    }

    if (!photo) {
      setMessage({
        type: "error",
        text: "Фото не добавлено",
      });
      return;
    }
    setLoadingStates({ ...loadingStates, addRequest: true });
    try {
      const formData = new FormData();
      formData.append("photo", photo);
      const response = await fetch(
        "https://mojdomrequests.linkpc.net/uploadPhoto.php",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.text);
        error.type = data.type;
        throw error;
      }

      newRequestFields.photo.link = data.data.link;
      newRequestFields.photo.id = data.data.id;
      setMessage({
        text: data.text,
        type: data.type,
      });
    } catch (err) {
      setMessage({
        text: err.message,
        type: err.type,
      });
      setLoadingStates({ ...loadingStates, addRequest: false });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("request", JSON.stringify(newRequestFields));
      const response = await fetch(
        "https://mojdomrequests.linkpc.net/uploadRequest.php",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      if (!response.ok) {
        const error = new Error(data.text);
        error.type = data.type;
        throw error;
      }

      newRequestFields.id = data.id;
      setMessage({
        text: data.text,
        type: data.type,
      });
    } catch (err) {
      setMessage({
        text: err.message,
        type: err.type,
      });
      setLoadingStates({ ...loadingStates, addRequest: false });
      return;
    }
    setRequest(defaultRequest);
    setRequests((prev) => [...prev, newRequestFields]);
    setPhoto(null);
    URL.revokeObjectURL(photoPreview);
    setPhotoPreview(null);
    setLoadingStates({ ...loadingStates, addRequest: false });
  };

  const toggleEditing = (id) => {
    const currentEditingRequest = requests.find((req) => req.id === id);
    setIsEditing(true);
    setEditingRequest({ ...currentEditingRequest });
  };

  const value = {
    request,
    handleEdit,
    defaultRequest,
    handleDelete,
    isEditing,
    handleChange,
    fileInputRef,
    handleFileChange,
    photoPreview,
    handleSubmit,
    message,
    requests,
    setRequest,
    setRequests,
    loadingStates,
    toggleEditing,
    editingRequest,
    cancelEditing,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};
