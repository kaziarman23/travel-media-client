import "./CSS/SocialCards.css";
import facebook from "../../assets/Icons/facebook.png";
import github from "../../assets/Icons/linkedin.png";
import instagram from "../../assets/Icons/instagram.png";
import Swal from "sweetalert2";

const SocialCard = () => {
  const handleClick = () => {
    Swal.fire({
      title: "Sorry..",
      text: "It's Not a Real Link !",
      icon: "info",
      color: "white",
      background: "#3C3B3F",
      confirmButtonText: "Okey",
    });
  };
  return (
    <div className="SocialCards">
      <button onClick={handleClick} className="SocialCard btn">
        <div>
          <img src={instagram} alt="instagram icon" className="w-8 h-8" />
        </div>
        <div>
          <p className="tip">Instagram</p>
          <p className="second-text">Follow us on Instagram.</p>
        </div>
      </button>
      <button onClick={handleClick} className="SocialCard btn">
        <div>
          <img src={facebook} alt="facebook icon" className="w-8 h-8" />
        </div>
        <div>
          <p className="tip">Facebook</p>
          <p className="second-text">Vsite our Facebook Page.</p>
        </div>
      </button>
      <button onClick={handleClick} className="SocialCard btn">
        <div>
          <img src={github} alt="github icon" className="w-8 h-8" />
        </div>
        <div>
          <p className="tip">Linked In</p>
          <p className="second-text">Follow us on Linked-In.</p>
        </div>
      </button>
    </div>
  );
};

export default SocialCard;
