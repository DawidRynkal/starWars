import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import starWarsApiPaths from './star-wars-api-paths';
import { CharacterResponseType, PlanetResponseType, VehicleResponseType } from './star-wars-api-types';

export const starWarsApi = createApi({
  reducerPath: 'starWarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: starWarsApiPaths.basic}),
  endpoints: (builder) => ({
    getList: builder.query<CharacterResponseType, {dataType: string}>({
      query: ({ dataType }) => ({
        url: dataType,
      }),
    }),
    getSinglePlanet: builder.query<PlanetResponseType, {planetUrl: string}>({
      query: ({ planetUrl }) => ({
        url: planetUrl,
      }),
    }),
    getSingleVehicle: builder.query<VehicleResponseType, {vehicleUrl: string}>({
      query: ({ vehicleUrl }) => ({
        url: vehicleUrl,
      }),
    }),
  }),
});

export const { useGetListQuery,  useGetSinglePlanetQuery, useGetSingleVehicleQuery } = starWarsApi;