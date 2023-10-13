import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import routerPaths from "../../router/router-paths";
import EmptyUser from "../../assets/starWarsLogoBlack.png";
import Vehicle from "../../assets/vehicle.png";
import Planet from "../../assets/starWarsPlanet.png";
import Vader from "../../assets/vader.png";
import Hamburger from "../../assets/hamburger.svg";
import CloseIcon from "../../assets/close.svg";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <Sidebar $showMenu={showMenu}>
      <StyledWrapper onClick={() => setShowMenu((prev) => !prev)}>
        {!showMenu ? (
          <StyledMenuElem src={Hamburger} alt="menu-hamburger" />
        ) : (
          <StyledMenuElem src={CloseIcon} alt="menu-close" />
        )}
      </StyledWrapper>
      <AvatarIcon src={EmptyUser} alt="starWars" />
      <MenuLink to={routerPaths.characters}>
        <AvatarIcon $smaller src={Vader} alt="Vader" />
        Characters
      </MenuLink>
      <MenuLink to={routerPaths.vehicles}>
        <AvatarIcon $smaller src={Vehicle} alt="vehicle" />
        Vehicles
      </MenuLink>
      <MenuLink to={routerPaths.planets}>
        <AvatarIcon $smaller src={Planet} alt="planet" />
        Planets
      </MenuLink>
    </Sidebar>
  );
};

const StyledMenuElem = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const StyledWrapper = styled.div`
  display: none;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}px) {
    display: block;
    position: fixed;
    right: 20px;
  }
`;

type AvatarIconType = {
  $smaller?: boolean;
};

const AvatarIcon = styled.img<AvatarIconType>`
  height: auto;
  width: ${({ $smaller }) => ($smaller ? "18px" : "74px")};
  border-radius: 14px;
  margin-bottom: ${({ $smaller }) => ($smaller ? "" : "15px")};
  margin-right: ${({ $smaller }) => ($smaller ? "10px" : "0")};
`;

type SidebarProps = {
  $showMenu: boolean;
};

const Sidebar = styled.div<SidebarProps>`
  background-color: #333;
  color: #fff;
  height: 100vh;
  width: 100px;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: fixed;
  transition: 0.3s;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}px) {
    left: ${({ $showMenu }) => ($showMenu ? "0" : "-140px")};
  }
`;

const MenuLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin: 10px 0;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`;

export default Menu;
