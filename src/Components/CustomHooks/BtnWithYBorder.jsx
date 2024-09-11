import styled from "styled-components";

const BtnWithYBorder = ({ children }) => {
  return (
    <StyledWrapper>
      <button>{children}</button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  button {
    color: white;
    text-decoration: none;
    font-size: 25px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
  }

  button::before {
    margin-left: auto;
  }

  button::after,
  button::before {
    content: "";
    width: 0%;
    height: 2px;
    background: white;
    display: block;
    transition: 0.5s;
  }

  button:hover::after,
  button:hover::before {
    width: 100%;
  }
`;

export default BtnWithYBorder;
