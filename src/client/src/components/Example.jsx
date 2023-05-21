import { useState } from "react";
import { useTranslation } from "react-i18next";
import randomGenerator from "../helpers/randomGenerator";
import useForm from "../hooks/useForm";
import convertToArray from "../helpers/convertToArray";
import Pipocas from "./Pipocas";

const Example = () => {
  const { i18n } = useTranslation('global');
  const [random, setRandom] = useState('');
  const columnA = useForm();
  const columnB = useForm();
  const handleRandom = () => {
    const arrayA = convertToArray(columnA.form);
    const arrayB = convertToArray(columnB.form);
    const { result } = randomGenerator({ type: 4, number: 2, columnA: arrayA.result, columnB: arrayB.result });
    return setRandom(result);
  };
  return (
    <div>
      <h1>Example</h1>
      <pre>{random}</pre>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('es')}>ES</button>
      <hr />
      <form>
        <input type='text' name='1' onChange={columnA.changed} />
        <input type='text' name='2' onChange={columnA.changed} />
        <input type='text' name='3' onChange={columnA.changed} />
        <input type='text' name='4' onChange={columnA.changed} />
        <input type='text' name='5' onChange={columnA.changed} />
      </form>
      <form>
        <input type='text' name='a' onChange={columnB.changed} />
        <input type='text' name='b' onChange={columnB.changed} />
        <input type='text' name='c' onChange={columnB.changed} />
        <input type='text' name='d' onChange={columnB.changed} />
        <input type='text' name='e' onChange={columnB.changed} />
      </form>
      <button onClick={handleRandom}>Random</button>
      <Pipocas
        color='black'
        time={3000}
        sizeMin={5}
        sizeMax={50}
      />
    </div>
  );
};

export default Example;