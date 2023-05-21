import Header from "../components/Header";
import Body from "../components/Body";
import Footer from "../components/Footer";
import useDarkValue from "../hooks/useDarkValue";

const colors = {
  light: "#EBEBEB",
  dark: "#2C3333",
};

const Home = () => {
  const color = useDarkValue(colors.light, colors.dark);
  return (
    <div
      style={{ backgroundColor: color}}
      className="home__container"
    >
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default Home;