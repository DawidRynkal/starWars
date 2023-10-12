import { useLocation } from "react-router";
import styled from "styled-components";
import EmptyUser from "../../assets/starWarsLogoBlack.png";
import Planet from "../../assets/starWarsPlanet.png";
import Vechicle from "../../assets/vehicle.png";
import { Link } from "react-router-dom";
import routerPaths from "../../router/router-paths";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { styledTheme } from "../../theme";

const DetailsPage = () => {
  const { name, avatar, homeworld, vehicles, gender } = useLocation().state;
  const [vehiclesNames, setVehiclesNames] = useState<
    { vehicleUrl: string | null; vehicleName: string | null }[]
  >([]);
  const [fetchingNames, setFetchingNames] = useState<boolean>(false);

  //   limited to one because a larger number causes problems because the API is not adapted to download so many things at once. A correct API allows you to accept an ids array so that you can perform one query, e.g.: "https://swapi.dev/api/people/[1,2,4,6...etd]"

  useEffect(() => {
    if (vehicles) {
      const smallerArr = [vehicles[0]];
      setFetchingNames(true);
      Promise.all(smallerArr.map((url) => fetchVehichle(url))).then((names) => {
        setVehiclesNames(names);
        setFetchingNames(false);
      });
    }
  }, []);

  const fetchVehichle = async (url: string) => {
    try {
      const result = await fetch(url);
      const resp = await result.json();
      return {
        vehicleName: resp.name,
        vehicleUrl: resp.url,
      };
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      return {
        vehicleName: null,
        vehicleUrl: null,
      };
    }
  };

  const Vehicle: React.FC<{
    vehicleUrl: string | null;
    vehicleName: string | null;
  }> = ({ vehicleUrl, vehicleName }) => {
    return (
      <LinkStyled
        to={routerPaths.vehiclesDetails}
        state={{
          vehicleUrl,
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
          <Detail>NAME: <span>{name}</span> </Detail>
          <Detail>GENDER: <span>{gender}</span> </Detail>
        </DetailsWrapper>
      </DataContainer>
      <Container>
        <AvatarLinkWrapper>
          <LinksWrapper>
            <LinkStyled
              to={routerPaths.planetDetails}
              state={{
                homeworld,
              }}
            >
              <IconLinkWrapper>
                <AvatarIcon src={Planet} alt="planet" />
                Home planet details here...(click)
              </IconLinkWrapper>
            </LinkStyled>
            {fetchingNames ? (
              <LoaderWrapper>
                <ClipLoader
                  size={50}
                  color={styledTheme.colors.blue}
                  loading={fetchingNames}
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
  color:  ${({ theme: { colors } }) => colors.black};;
  font-weight: bold;
  transition: color 0.2s;
  display: block;
  margin-bottom: 15px;

  &:hover {
    color:  ${({ theme: { colors } }) => colors.blue3};;
    text-decoration: underline;
  }
`;

const Detail = styled.h1`
  color:  ${({ theme: { colors } }) => colors.daybreakBlue};;
  font-size: 18px;

  span {
    color:  ${({ theme: { colors } }) => colors.black};
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
