import styled from "styled-components";
import routerPaths from "../../router/router-paths";
import EmptyUser from "../../assets/starWarsLogoBlack.png";
import { Link } from "react-router-dom";

// enum Gender {
//   MALE = "male",
//   FEMALE = "female",
// }

type UserTileType = {
  name: string;
  avatar?: string;
  url: string;
  homeworld: string;
  vehicles: string[];
  gender: string;
};

const UserTile = ({ name, avatar, url, homeworld, vehicles, gender }: UserTileType) => {
  const parts = url.split("/");
  const idFrom1url = parts[parts.length - 2];

  return (
    <Link
      to={`${routerPaths.characterDetails}/${idFrom1url}`}
      state={{
        name,
        avatar,
        url,
        homeworld,
        vehicles,
        gender
      }}
    >
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
    </Link>
  );
};

const ContentWrapper = styled.div``;

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
  padding: 24px;
  min-width: 250px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}px) {
    min-width: none;
    padding: 10px;
  }
`;

export default UserTile;
