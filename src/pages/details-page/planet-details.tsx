import { useLocation } from "react-router";
import { useGetSinglePlanetQuery } from "../../services/star-wars-api";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../../shared/components/ErrorMessage";
import { styledTheme } from "../../theme";
import styled from "styled-components";
import Planet from "../../assets/starWarsPlanet.png";
import useFetchPersonNames from "../../hooks/useFetchPersonName";

const PlanetDetails = () => {
  const { url } = useLocation().state;
  const { data, error, isLoading } = useGetSinglePlanetQuery({
    planetUrl: url,
  });
  const { peopleNames: residentNames, fetchingNames } = useFetchPersonNames(
    data?.residents
  );

  return (
    <Container>
      {isLoading ? (
        <LoaderWrapper>
          <ClipLoader
            size={50}
            color={styledTheme.colors.blue}
            loading={isLoading}
          />
        </LoaderWrapper>
      ) : error ? (
        <ErrorMessage
          text="Wystąpił błąd, spróbuj później"
          error={error ? true : false}
        />
      ) : (
        <Content>
          <Header>
            <Label>Planet Details</Label>
            <AvatarPlanet src={Planet} alt="starWarsPlanet" />
          </Header>
          <DetailsItem>
            <Label>Planet Name:</Label>
            <Value>{data?.name}</Value>
          </DetailsItem>
          <DetailsItem>
            <Label>Population:</Label>
            <Value>{data?.population}</Value>
          </DetailsItem>
          {fetchingNames ? (
            <LoaderWrapper>
              <ClipLoader
                size={50}
                color={styledTheme.colors.blue}
                loading={fetchingNames}
              />
            </LoaderWrapper>
          ) : (
            <ResidentsContainer>
              <ResidentsLabel>Residents:</ResidentsLabel>
              <ResidentsList>
                {residentNames.map((resident, index) => (
                  <ResidentItem key={`${resident}-${index}`}>
                    {resident}
                  </ResidentItem>
                ))}
              </ResidentsList>
            </ResidentsContainer>
          )}
        </Content>
      )}
    </Container>
  );
};

const AvatarPlanet = styled.img`
  width: auto;
  height: 124px;
  border-radius: 14px;
`;

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const LoaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const Content = styled.div`
  text-align: left;
  padding: 20px;
  border: 1px solid ${({ theme: { colors } }) => colors.gray};
  border-radius: 5px;
`;

const Header = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const DetailsItem = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Label = styled.div`
  flex: 1;
  font-weight: bold;
`;

const Value = styled.div`
  flex: 2;
`;

const ResidentsContainer = styled.div`
  margin-top: 20px;
`;

const ResidentsLabel = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

const ResidentsList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ResidentItem = styled.li`
  font-size: 16px;
  margin-bottom: 5px;
`;

export default PlanetDetails;
