import { Link } from "react-router-dom";
import logo from "/logo.png";
import SocialCard from "../CustomHooks/SocialCards";
import { BsAirplaneEnginesFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="footer bg-[#2b333c] text-[#9ea4b2] p-10">
      <aside>
        <a href="#Hero">
          <span className="flex items-center gap-2 hover:text-white">
            <BsAirplaneEnginesFill />
            Travel Media
          </span>
        </a>
        <p className="hover:text-white">Providing service since 2018.</p>
      </aside>
      <div>
        <h6 className="footer-title">Social</h6>
        <SocialCard></SocialCard>
      </div>
    </footer>
  );
};

export default Footer;
