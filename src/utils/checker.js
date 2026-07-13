import {FIELDS_IN_ENGLISH, FIELDS_IN_RUSSIAN} from "../constants/constants.js"; 

export const emptyChecker = (
  obj, fieldsToCheck
) => {
  if(!obj || typeof obj !== "object") return []; 
 
  return fieldsToCheck.filter(field => {
    const value = obj[field];

    return value === null 
      || value === undefined 
      || value === "";
  })
}

export const toRussian = (field) => {
  return FIELDS_IN_RUSSIAN[FIELDS_IN_ENGLISH.indexOf(field)];
}



