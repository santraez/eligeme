import { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';

const useDarkValue = (light, dark) => {
  const [value, setValue] = useState(light);
  const { appContext } = useAppContext(); 
  const darkMode = appContext['dark-mode'];
  useEffect(() => {
    darkMode ? setValue(dark) : setValue(light);
  }, [darkMode, light, dark]);
  return value;
};

export default useDarkValue;