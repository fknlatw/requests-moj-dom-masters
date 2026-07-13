import { createContext, useState, useEffect, useContext } from "react";
import { FirebaseContext } from "./FirebaseContext.jsx";
import { defaultFiltersData } from "../constants/constants.js";
import { MessageContext } from "./MessageContext.jsx";
export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const { requests, isEditing} = useContext(FirebaseContext);
  const { setMessage } = useContext(MessageContext);
  
  const [selectedFilters, setSelectedFilters] = useState({}); 
  const [filtersData, setFiltersData] = useState(defaultFiltersData);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);

  useEffect(() => {
    const getData = () => {
      if (requests.length > 0) {
        const uniqueApplicantAddresses = [
          ...new Set(
            requests
              .map(req => req.applicantAddress)
              .filter(addr => addr !== undefined && addr !== null)
          ),
        ];
        const uniqueApplicantPhones = [
          ...new Set(
            requests
              .map(req => req.applicantPhone)
              .filter(phone => phone !== undefined && phone !== null)
          ),
        ];
        const uniqueCreationDates = [
          ...new Set(
            requests
              .map(req => req.creationDate)
              .filter(date => date !== undefined && date !== null)
          ),
        ];
        const uniqueCompletionDates = [
          ...new Set(
            requests
              .map(req => req.completionDate)
              .filter(date => date !== undefined && date !== null)
          ),
        ];
        const uniquePerformers = [
          ...new Set(
            requests
              .map(req => req.performer)
              .filter(performer => performer !== undefined && performer !== null)
          ),
        ];
        setFiltersData({
          applicantAddress: uniqueApplicantAddresses,
          applicantPhone: uniqueApplicantPhones,
          creationDate: uniqueCreationDates,
          completionDate: uniqueCompletionDates,
          performer: uniquePerformers,
        });
      }
    };

    getData();
  }, [requests]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMessage({
        type: "error",
        text: "Нельзя применять фильтры в режиме редактирования"
      });
      return;
    }

    let filteredArray = [...requests];

    if(selectedFilters.creationDate) {
      filteredArray = filteredArray.filter(item => item.creationDate === selectedFilters.creationDate);
    }

    if(selectedFilters.completionDate) {
     filteredArray = filteredArray.filter(item => item.completionDate === selectedFilters.completionDate);
    }

    if(selectedFilters.performer) {
      filteredArray = filteredArray.filter(item => item.performer === selectedFilters.performer);
    }

    
    if(filteredArray.length === 0) {
      setMessage({
        type: "error",
        text: "По вашему запросу ничего не найдено"
      });
      return;
    }

    setFilteredRequests(filteredArray);
    setIsFiltered(true);
  }

  const cancelFilters = (e) => {
    e.preventDefault();
    if (isEditing) {
      setMessage({
        type: "error",
        text: "Нельзя отменить фильтры в режиме редактирования"
      });
      return;
    }
    setFilteredRequests([]);
    setIsFiltered(false);
  }
  const value = {
    filtersData,
    setSelectedFilters,
    selectedFilters,
    handleSubmit,
    filteredRequests,
    isFiltered,
    cancelFilters
  };
  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
};
