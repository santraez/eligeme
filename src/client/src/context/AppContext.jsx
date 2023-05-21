import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [appContext, setAppContext] = useState({
    state: 'initial',
    type: 1,
    code: '---',
    columnA: [],
    columnB: [],
    row: 1,
    nav: () => {},
    name: '',
    columnAvalue: '',
    columnBvalue: '',
    numberInpContext: 4,
    deleteAll: false,
  });
  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};