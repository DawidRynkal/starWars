import { useEffect, useState } from "react";

const useFetchPersonNames = (data: string[] | undefined) => {
  const [peopleNames, setPeopleNames] = useState<string[]>([]);
  const [fetchingNames, setFetchingNames] = useState<boolean>(false);

  const [vehiclesNames, setVehiclesNames] = useState<
    { vehicleUrl: string | null; vehicleName: string | null }[]
  >([]);
  const [fetchingVehiclesNames, setFetchingVehiclesNames] =
    useState<boolean>(false);

  //   limited to two because a larger number causes problems because the API is not adapted to download so many things at once. A correct API allows you to accept an ids array so that you can perform one query, e.g.: "https://swapi.dev/api/people/[1,2,4,6...etd]"

  useEffect(() => {
    if (data) {
      const smallerArr = [data[0], data[1]];
      setFetchingNames(true);
      Promise.all(
        smallerArr.map((residentUrl) => fetchPersonName(residentUrl))
      ).then((names) => {
        setPeopleNames(names);
        setFetchingNames(false);
      });
    }
  }, [data]);

  const fetchPersonName = async (url: string) => {
    try {
      const response = await fetch(url);
      const personData = await response.json();
      return personData.name || "Unknown person";
    } catch (error) {
      console.error("Error fetching person data:", error);
      return "Unknown person";
    }
  };

  useEffect(() => {
    if (data) {
      const smallerArr = [data[0], data[1]];
      setFetchingVehiclesNames(true);
      Promise.all(smallerArr.map((url) => fetchVehichle(url))).then((names) => {
        setVehiclesNames(names);
        setFetchingVehiclesNames(false);
      });
    }
  }, [data]);

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

  return {
    peopleNames,
    fetchingNames,
    vehiclesNames,
    fetchingVehiclesNames,
  };
};

export default useFetchPersonNames;
