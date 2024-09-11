import { Link } from "react-router-dom";
import logo from "/logo.png";
import SocialCard from "../CustomHooks/SocialCards";

const Footer = () => {
  return (
    <footer className="footer bg-[#2b333c] text-[#9ea4b2] p-10">
      <aside>
        <Link to="/">
          <img src={logo} alt="website logo" />
        </Link>
        <p className="hover:text-white">
          Travel Media
          <br />
          Providing service since 2018.
        </p>
      </aside>
      <div>
        <h6 className="footer-title">Social</h6>
        <SocialCard></SocialCard>
      </div>
    </footer>
  );
};

export default Footer;
