import styled from "styled-components";
import routerPaths from "../../router/router-paths";
import EmptyUser from "../../assets/starWarsLogoBlack.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import starWarsApiPaths from "../../services/star-wars-api-paths";

type CharacterTileType = {
  name?: string;
  url: string;
  listType: string;
  avatar?: string;
  homeworld?: string;
  vehicles?: string[];
  gender?: string;
};

type StateType = {
  url: string;
  name?: string;
  avatar?: string;
  homeworld?: string;
  vehicles?: string[];
  gender?: string;
};

const CharacterTile = ({
  name,
  avatar,
  url,
  listType,
  homeworld,
  vehicles,
  gender,
}: CharacterTileType) => {
  const initialState = {
    name: "",
    url: "",
    listType: "",
    homeworld: "",
    vehicles: [],
    gender: "",
  };
  const parts = url.split("/");
  const idFromUrl = parts[parts.length - 2];
  const [currentListState, setCurrentListState] =
    useState<StateType>(initialState);
  const [routeToDetails, setRouteToDetails] = useState<string>("");

  useEffect(() => {
    if (listType === starWarsApiPaths.people) {
      setRouteToDetails(`${routerPaths.characterDetails}/${idFromUrl}`);
      setCurrentListState({
        name,
        avatar,
        url,
        homeworld,
        vehicles,
        gender,
      });
    } else if (listType === starWarsApiPaths.planets) {
      setRouteToDetails(routerPaths.planetDetails);
      setCurrentListState({
        url,
      });
    } else {
      setRouteToDetails(routerPaths.vehiclesDetails);
      setCurrentListState({
        url,
      });
    }
  }, [name, avatar, url, homeworld, vehicles, gender, listType]);

  return (
    <StyledLink to={routeToDetails} state={currentListState}>
      <Tile>
        <ContentWrapper>
          <TileHead>
            {avatar ? (
              <Avatar src={avatar} alt="user face" />
            ) : (
              <Avatar src={EmptyUser} alt="starWars" />
            )}

            <TitleWrapper>
              <NamesWrapper>
                <FullName>{name}</FullName>
              </NamesWrapper>
            </TitleWrapper>
          </TileHead>
        </ContentWrapper>
      </Tile>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const ContentWrapper = styled.div`
  padding: 5px;
`;

const TitleWrapper = styled.div`
  padding: 4px 0px 4px 16px;
`;

const FullName = styled.p`
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme: { colors } }) => colors.black};
`;

const NamesWrapper = styled.div`
  display: flex;
`;

const TileHead = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: auto;
  height: 64px;
  border-radius: 8px;
`;

const Tile = styled.div`
  border: 1px solid ${({ theme: { colors } }) => colors.gray};
  border-radius: 16px;
  padding: 30px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}px) {
    min-width: none;
    padding: 10px;
  }
`;

export default CharacterTile;
