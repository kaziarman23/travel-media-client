import styled from "styled-components";
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
    <StyledWrapper>
      <div className="cards">
        <button onClick={handleClick} className="card btn">
          <div>
            <img src={instagram} alt="instagram icon" className="w-8 h-8" />
          </div>
          <div>
            <p className="tip">Instagram</p>
            <p className="second-text">Follow us on Instagram.</p>
          </div>
        </button>
        <button onClick={handleClick} className="card btn">
          <div>
            <img src={facebook} alt="facebook icon" className="w-8 h-8" />
          </div>
          <div>
            <p className="tip">Facebook</p>
            <p className="second-text">Vsite our Facebook Page.</p>
          </div>
        </button>
        <button onClick={handleClick} className="card btn">
          <div>
            <img src={github} alt="github icon" className="w-8 h-8" />
          </div>
          <div>
            <p className="tip">Linked In</p>
            <p className="second-text">Follow us on Linked-In.</p>
          </div>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .cards {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .cards .card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 10px;
    text-align: left;
    height: 50px;
    width: 250px;
    border-radius: 10px;
    color: #707985;
    cursor: pointer;
    transition: 400ms;
  }

  .cards .card p.tip {
    font-size: 1em;
    font-weight: 700;
  }

  .cards .card p.second-text {
    font-size: 0.7em;
  }

  .cards .card:hover {
    color: white;
    transform: scale(1.1, 1.1);
  }

  .cards:hover > .card:not(:hover) {
    filter: blur(10px);
    transform: scale(0.9, 0.9);
  }
`;

export default SocialCard;
