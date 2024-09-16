import "./CSS/UseLearnMoreBtn.css";

const UseLearnMoreBtn = ({ children }) => {
  return (
    <button className="learn-more">
      <span className="circle" aria-hidden="true">
        <span className="icon arrow" />
      </span>
      <span className="button-text">{children}</span>
    </button>
  );
};

export default UseLearnMoreBtn;
