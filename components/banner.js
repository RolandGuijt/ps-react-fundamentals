import { useContext } from "react";
import navValues from "../helpers/navValues";
import { navigationContext } from "./app";
import { logo } from "./banner.module.css";

const subtitleStyle = {
  fontStyle: "italic",
  fontSize: "x-large",
  color: "coral",
};

const Banner = ({ children }) => {
  const { navigate } = useContext(navigationContext);
  return (
    <header className="row mb-4">
      <div className="col-5">
        <img
          src="./GloboLogo.png"
          alt="logo"
          className={logo}
          onClick={() => navigate(navValues.home)}
        />
      </div>
      <div className="col-7 mt-5" style={subtitleStyle}>
        {children}
      </div>
    </header>
  );
};

export default Banner;
