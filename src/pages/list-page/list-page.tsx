import { useGetListQuery } from "../../services/star-wars-api";
import styled from "styled-components";
import Logo from "../../assets/starWarsLogo.png";
import { ClipLoader } from "react-spinners";
import { styledTheme } from "../../theme";
import UserTile from "../../shared/components/UserTile";
import ErrorMessage from "../../shared/components/ErrorMessage";

type ListPageType = {
  selectedList: string;
}

// eslint-disable-next-line react/prop-types
const ListPage: React.FC<ListPageType> = ({ selectedList }) => {
  const { data, error, isFetching } = useGetListQuery({
    dataType: selectedList,
  });

  return (
    <Container>
      <LogoImage src={Logo} alt="Logo" />
      {isFetching ? (
        <LoaderWrapper>
          <ClipLoader
            size={50}
            color={styledTheme.colors.blue}
            loading={isFetching}
          />
        </LoaderWrapper>
      ) : error ? (
        <ErrorMessage
          text="Wystąpił błąd, spróbuj później"
          error={error ? true : false}
        />
      ) : (
        <>
          <ListWrapper>
            {data?.results.map((character) => (
              <UserTile
                key={character.name}
                name={character.name}
                url={character.url}
                homeworld={character.homeworld}
                vehicles={character.vehicles}
                gender={character.gender}
              />
            ))}
          </ListWrapper>
        </>
      )}
    </Container>
  );
};
const LoaderWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  width: 146px;
  margin-right: 10px;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  padding: 5px 0;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xl}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Container = styled.div`
  margin: 10px;
  padding: 4px;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}px) {
    margin: 14px 30px;
    padding: 4px;
  }
`;

export default ListPage;
