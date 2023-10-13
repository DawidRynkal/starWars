import { Routes, Route } from "react-router";
import HomePage from "../pages/home-page";
import routerPaths from "./router-paths";
import DetailsPage from "../pages/details-page";
import Menu from "../shared/components/Menu";
import styled from "styled-components";
import PlanetDetails from "../pages/details-page/planet-details";
import VehiclesDetails from "../pages/details-page/vehicles-details";
import ListPage from "../pages/list-page";
import starWarsApiPaths from "../services/star-wars-api-paths";

const Router = () => (
  <Container>
    <Menu />
    <Content>
      <Routes>
        <Route path={routerPaths.home} element={<HomePage />} />
        <Route path={routerPaths.characters} element={<ListPage selectedList={starWarsApiPaths.people} />} />
        <Route path={routerPaths.vehicles} element={<ListPage selectedList={starWarsApiPaths.vehicles} />} />
        <Route path={routerPaths.planets} element={<ListPage selectedList={starWarsApiPaths.planets} />} />
        <Route
          path={`${routerPaths.characterDetails}/:id`}
          element={<DetailsPage />}
        />
        <Route path={routerPaths.planetDetails} element={<PlanetDetails />} />
        <Route
          path={routerPaths.vehiclesDetails}
          element={<VehiclesDetails />}
        />
      </Routes>
    </Content>
  </Container>
);

const Container = styled.div`
  display: flex;
`;

const Content = styled.div`
  margin-left: 140px;
  width: 100%;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.xs}px) {
    margin-left: 0;
  }
`;

export default Router;
