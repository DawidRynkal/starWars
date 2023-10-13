import { useLocation } from "react-router";
import { useGetSingleVehicleQuery } from "../../services/star-wars-api";
import { ClipLoader } from "react-spinners";
import { styledTheme } from "../../theme";
import ErrorMessage from "../../shared/components/ErrorMessage";
import styled from "styled-components";
import Vehicle from "../../assets/vehicle.png";
import useFetchPersonNames from "../../hooks/useFetchPersonName";

const VehiclesDetails = () => {
  const { url } = useLocation().state;
  const { data, error, isLoading } = useGetSingleVehicleQuery({
    vehicleUrl: url,
  });
  const { peopleNames: pilotsNames, fetchingNames } = useFetchPersonNames(
    data?.pilots
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
          <Header>Vehicle Details</Header>
          <AvatarVehicles src={Vehicle} alt="starWarsVehicles" />
          <DetailsItem>
            <Label>Vehicle Name:</Label>
            <Value>{data?.name}</Value>
          </DetailsItem>
          <DetailsItem>
            <Label>Model:</Label>
            <Value>{data?.model}</Value>
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
              {data?.pilots.length === 0 ? (
                <DetailsItem>
                  <Label>No pilots...</Label>
                </DetailsItem>
              ) : (
                <>
                  <ResidentsLabel>Pilots:</ResidentsLabel>
                  <ResidentsList>
                    {pilotsNames.map((pilot) => (
                      <ResidentItem key={pilot}>{pilot}</ResidentItem>
                    ))}
                  </ResidentsList>
                </>
              )}
            </ResidentsContainer>
          )}
        </Content>
      )}
    </Container>
  );
};

const AvatarVehicles = styled.img`
  width: auto;
  height: 154px;
  border-radius: 14px;
  margin-bottom: 15px;
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

export default VehiclesDetails;
