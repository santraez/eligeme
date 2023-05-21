import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useDarkValue from "../hooks/useDarkValue";
import { useAppContext } from '../context/AppContext';
import useForm from "../hooks/useForm";
import BarInputs from "./BarInputs";
import BarStart from "./BarStart";

const colors = {
  light: {
    input: '#FFF7B9',
    text: '#2C3333',
    focus: 'input-name__dark',
    border: '#FFDE00',
  },
  dark: {
    input: '#3D323A',
    text: '#EBEBEB',
    focus: 'input-name__light',
    border: '#9A1663',
  },
};

const PrimaryButtons = () => {
  const color = useDarkValue(colors.light, colors.dark);
  const { appContext, setAppContext } = useAppContext();
  const { form, changed } = useForm();
  const { t } = useTranslation('global');
  useEffect(() => {
    if (form.name) {
      return setAppContext({ ...appContext, name: form.name });
    } else {
      return setAppContext({ ...appContext, name: '' });
    };
  }, [form]); 
  return (
    <div>
      <div>
        <BarInputs />
      </div>
      <div>
        <input
          style={{
            color: color.text,
            backgroundColor: color.input,
            // border: `5px solid ${color.border}`,
          }}
          className={color.focus}
          type="text"
          name="name"
          onChange={changed}
          placeholder={t('body.input-name')}
        />
      </div>
      <div>
        <BarStart />
      </div>
    </div>
  );
};

export default PrimaryButtons;