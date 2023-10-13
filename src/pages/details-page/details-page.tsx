import { useLocation } from "react-router";
import styled from "styled-components";
import EmptyUser from "../../assets/starWarsLogoBlack.png";
import Planet from "../../assets/starWarsPlanet.png";
import Vechicle from "../../assets/vehicle.png";
import { Link } from "react-router-dom";
import routerPaths from "../../router/router-paths";
import React from "react";
import { ClipLoader } from "react-spinners";
import { styledTheme } from "../../theme";
import useFetchPersonNames from "../../hooks/useFetchPersonName";

const DetailsPage = () => {
  const { name, avatar, homeworld, vehicles, gender } = useLocation().state;
  const { vehiclesNames, fetchingVehiclesNames } =
    useFetchPersonNames(vehicles);

  const Vehicle: React.FC<{
    vehicleUrl: string | null;
    vehicleName: string | null;
  }> = ({ vehicleUrl, vehicleName }) => {
    return vehicleName === null ? (
      <Detail>No vehicle...</Detail>
    ) : (
      <LinkStyled
        to={routerPaths.vehiclesDetails}
        state={{
          url: vehicleUrl,
        }}
      >
        <IconLinkWrapper>
          <AvatarIcon src={Vechicle} alt="vehicle" />
          {vehicleName}
        </IconLinkWrapper>
      </LinkStyled>
    );
  };

  return (
    <>
      <DataContainer>
        {avatar ? (
          <AvatarDetails src={avatar} alt="user face" />
        ) : (
          <AvatarDetails src={EmptyUser} alt="starWars" />
        )}
        <DetailsWrapper>
          <Detail>
            NAME: <span>{name}</span>{" "}
          </Detail>
          <Detail>
            GENDER: <span>{gender}</span>{" "}
          </Detail>
        </DetailsWrapper>
      </DataContainer>
      <Container>
        <AvatarLinkWrapper>
          <LinksWrapper>
            <LinkStyled
              to={routerPaths.planetDetails}
              state={{
                url: homeworld,
              }}
            >
              <IconLinkWrapper>
                <AvatarIcon src={Planet} alt="planet" />
                Home planet details
              </IconLinkWrapper>
            </LinkStyled>
            {fetchingVehiclesNames ? (
              <LoaderWrapper>
                <ClipLoader
                  size={50}
                  color={styledTheme.colors.blue}
                  loading={fetchingVehiclesNames}
                />
              </LoaderWrapper>
            ) : (
              vehiclesNames.map(({ vehicleName, vehicleUrl }) => (
                <Vehicle
                  key={vehicleUrl}
                  vehicleName={vehicleName}
                  vehicleUrl={vehicleUrl}
                />
              ))
            )}
          </LinksWrapper>
        </AvatarLinkWrapper>
      </Container>
    </>
  );
};

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const DataContainer = styled.div`
  margin: 20px;
  display: flex;
`;

const LinkStyled = styled(Link)`
  text-decoration: none;
  color: ${({ theme: { colors } }) => colors.black};
  font-weight: bold;
  transition: color 0.2s;
  display: block;
  margin-bottom: 15px;

  &:hover {
    color: ${({ theme: { colors } }) => colors.blue3};
    text-decoration: underline;
  }
`;

const Detail = styled.h1`
  color: ${({ theme: { colors } }) => colors.daybreakBlue};
  font-size: 18px;

  span {
    color: ${({ theme: { colors } }) => colors.black};
  }
`;

const AvatarLinkWrapper = styled.div`
  display: flex;
`;

const Container = styled.div`
  margin: 10px;
  padding: 4px;
  width: 100%;
`;

const AvatarDetails = styled.img`
  width: auto;
  height: 124px;
  border-radius: 14px;
`;

const IconLinkWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarIcon = styled.img`
  height: auto;
  width: 24px;
  border-radius: 14px;
  padding-right: 10px;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;

const DetailsWrapper = styled.div`
  margin-left: 20px;
`;

export default DetailsPage;
