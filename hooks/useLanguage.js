import { useContext } from "react";
import { LanguageContext } from "../providers/LanguageProvider";

export default function useLanguage() {
  const contextValue = useContext(LanguageContext);
  if (!contextValue) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  const { selectedLanguage, dispatch } = contextValue; // Directly destructure selectedLanguage and dispatch
  return {
    selectedLanguage,
    setSelectedLanguage: (language) => dispatch({type: "CHANGE", payload: language})
  };
}
