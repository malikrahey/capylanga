const { createContext, useState, useReducer } = require("react");


const initialState = {
  selectedLanguage: "es"
}

export const LanguageContext = createContext();

const reducer = (state, action) => {
  console.log("DISPATCH")
  switch (action.type) {
    
    case 'CHANGE':
        console.log(action.payload)
        return {...state, selectedLanguage: action.payload}
      break;
  }
}

const LanguageProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LanguageContext.Provider value={{...state, dispatch}}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;