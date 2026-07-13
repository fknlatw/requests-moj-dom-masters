export const fieldsToCheck = [
  "applicantFullName",
  "applicantAddress",
  "applicantPhone",
  "appealText",
  "completedWorks",
  "usedMaterial",
  "creationDate",
  "completionDate",
  "performer",
];

export const defaultRequest = {
  id: "",
  applicantFullName: "",
  applicantAddress: "",
  applicantPhone: "",
  appealText: "",
  completedWorks: "",
  usedMaterial: "",
  photo: {
    id: "",
    link: "",
  },
  creationDate: "",
  completionDate: "",
  performer: "",
};

export const defaultLoadingStates = {
  addRequest: false,
  editRequest: false,
  deleteRequest: false,
  loginUser: false,
  getRequests: false
}

export const FIELDS_IN_ENGLISH = [
  "applicantFullName",
  "applicantAddress",
  "applicantPhone",
  "appealText",
  "completedWorks",
  "usedMaterial",
  "photo",
  "creationDate",
  "completionDate",
  "performer"
];

export const FIELDS_IN_RUSSIAN = [
  "ФИО заявителя",
  "Адрес заявителя",
  "Телефон заявителя",
  "Текст обращения",
  "Выполненные работы",
  "Использованный материал",
  "Фото",
  "Дата создания",
  "Дата завершения",
  "Исполнитель"
];

export const defaultFiltersData = {
  applicantAddress: [],
  applicantPhone: [],
  creationDate: [],
  completionDate: [],
  performer: [],
}