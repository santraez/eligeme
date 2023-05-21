import { useTranslation } from "react-i18next";
import useDarkValue from "../hooks/useDarkValue";

const colors = {
  light: {
    footerText: '#2C3333',
  },
  dark: {
    footerText: '#EBEBEB',
  },
};

const Footer = () => {
  const { t } = useTranslation('global');
  const update = new Date().getFullYear();
  const color = useDarkValue(colors.light, colors.dark);
  return (
    <footer className="footer__container">
      <p style={{ color: color.footerText, }}>
        <span>&copy;</span>
        {` Copyright ${update} | ${t('footer.copy-right')} `}
        <a
          style={{ textDecoration: 'underline', color: color.footerText, }}
          href="https://elige.me/"
          target="_blank"
        >
          santraez
        </a>
      </p>
    </footer>
  );
};

export default Footer;