import "./CSS/UseBookingBtn.css";

const Button = ({ children }) => {
  return (
    <button type="button" className="button">
      <span className="button__text">{children}</span>
      <span className="button__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          stroke="currentColor"
          height="24"
          fill="none"
          className="svg"
        >
          <line y2="19" y1="5" x2="12" x1="12" />
          <line y2="12" y1="12" x2="19" x1="5" />
        </svg>
      </span>
    </button>
  );
};

export default Button;
