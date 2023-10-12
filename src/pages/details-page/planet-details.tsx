import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useGetSinglePlanetQuery } from "../../services/star-wars-api";
import { ClipLoader } from "react-spinners";
import ErrorMessage from "../../shared/components/ErrorMessage";
import { styledTheme } from "../../theme";
import styled from "styled-components";
import Planet from "../../assets/starWarsPlanet.png";

const PlanetDetails = () => {
  const { homeworld } = useLocation().state;
  const { data, error, isLoading } = useGetSinglePlanetQuery({
    planetUrl: homeworld,
  });

  const [residentNames, setResidentNames] = useState<string[]>([]);
  const [fetchingNames, setFetchingNames] = useState<boolean>(false);

  //   limited to two because a larger number causes problems because the API is not adapted to download so many things at once. A correct API allows you to accept an ids array so that you can perform one query, e.g.: "https://swapi.dev/api/people/[1,2,4,6...etd]"

  useEffect(() => {
    if (data && data.residents) {
      const smallerArr = [data.residents[0], data.residents[1]];
      setFetchingNames(true);
      Promise.all(
        smallerArr.map((residentUrl) => fetchResidentName(residentUrl))
      ).then((names) => {
        setResidentNames(names);
        setFetchingNames(false);
      });
    }
  }, [data]);

  const fetchResidentName = async (url: string) => {
    try {
      const response = await fetch(url);
      const residentData = await response.json();
      return residentData.name || "Unknown Resident";
    } catch (error) {
      console.error("Error fetching resident data:", error);
      return "Unknown Resident";
    }
  };

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
                {residentNames.map((resident) => (
                  <ResidentItem key={resident}>{resident}</ResidentItem>
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
  border: 1px solid  ${({ theme: { colors } }) => colors.gray};
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
