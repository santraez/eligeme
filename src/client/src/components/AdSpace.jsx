import useDarkValue from "../hooks/useDarkValue";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

const colors = {
  light: {
    background: '#D9D9D9',
    border: '#9A1663',
    text: '#9A1663',
  },
  dark: {
    background: '#454545',
    border: '#FFDE00',
    text: '#FFDE00',
  },
};

const Adspace = ({ width, height, dataAdSlot }) => {
  const color = useDarkValue(colors.light, colors.dark);
  const { t } = useTranslation('global');
  // useEffect(() => {
  //   try {
  //     window.adsbygoogle = window.adsbygoogle || [];
  //     window.adsbygoogle.push({});
  //   }
  //   catch (err) {
  //     console.log(err);
  //   }
  
  // },[]);
  return (
    <div className="ad-space__container">
      {/* <fieldset style={{ border: `1px solid ${color.border}` }}>
        <legend style={{ color: color.text }}>
          {t('body.ad-text')}
        </legend>
        <div style={{ width, height, }}>
          <ins className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-5364223869545930"
            data-ad-slot={dataAdSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
        </div>
      </fieldset> */}
    </div>
  );
};

export default Adspace;