import { Link } from "react-router-dom";
import styled from "styled-components";

export enum LinkButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface LinkButtonProps {
  route: string;
  text: string;
  type?: LinkButtonType;
}

const LinkButton = ({ route, text, type }: LinkButtonProps) => {
  switch (type) {
    case LinkButtonType.PRIMARY:
      return <PrimaryButton to={route}>{text}</PrimaryButton>;
    case LinkButtonType.SECONDARY:
      return <SecondaryButton to={route}>{text}</SecondaryButton>;
    default:
      return <PrimaryButton to={route}>{text}</PrimaryButton>;
  }
};

const PrimaryButton = styled(Link)`
  background-color: ${({ theme: { colors } }) => colors.gray2};
  color: ${({ theme: { colors } }) => colors.white};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.daybreakBlue};
  }
`;

const SecondaryButton = styled(Link)`
  background-color: ${({ theme: { colors } }) => colors.gray2};
  color: ${({ theme: { colors } }) => colors.gray};
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  text-decoration: none;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  transition: background-color 0.3s ease;
  width: fit-content;

  &:hover {
    background-color: ${({ theme: { colors } }) => colors.daybreakBlue};
  }
`;

export default LinkButton;
