import styled from "styled-components";

interface CustomButtonProps {
  text: string;
  handleOnClick: () => void;
}

const CustomButton = ({ text, handleOnClick }: CustomButtonProps) => {
  return <StyledButton onClick={handleOnClick}>{text}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: ${({ theme: { colors } }) => colors.blue};
  color: ${({ theme: { colors } }) => colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.daybreakBlue};
  }
`;

export default CustomButton;
