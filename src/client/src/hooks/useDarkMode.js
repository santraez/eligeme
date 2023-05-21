import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { useAppContext } from '../context/AppContext';
import useMedia from './useMedia';

const usePrefersDarkMode = () => {
  return useMedia(["(prefers-color-scheme: dark)"], [true], false);
};

const useDarkMode = () => {
  const [enabledState, setEnabledState] = useLocalStorage("dark-mode");
  const { appContext, setAppContext } = useAppContext();
  const prefersDarkMode = usePrefersDarkMode();
  const enabled = typeof enabledState !== "undefined" ? enabledState : prefersDarkMode;
  useEffect(() => {
    setAppContext({ ...appContext, "dark-mode": enabled, });
  }, [enabled]);
  return [enabled, setEnabledState];
};

export default useDarkMode;