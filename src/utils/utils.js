import { useSelector } from "react-redux";
import {
  updateFilterContent,
  updateSalonContent,
} from "../redux/slices/salons";
import { getAllServices } from "../services/Services";
import { salon } from "../services/salon";

export const getFormattedDate = (argDate) => {
  const date = new Date(argDate);
  if (argDate === undefined) return "-";
  let year = date.getFullYear();
  let month = date.getMonth();
  let dateNum = date.getDate();
  month = month + 1;
  if (month < 10) {
    month = `0${month}`;
  }
  if (dateNum < 10) {
    dateNum = `0${dateNum}`;
  }
  let dateFormatted = `${year}-${month}-${dateNum}`;
  return dateFormatted;
};




const R = 6371; // Radius of the Earth in kilometers

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const radLat1 = degToRad(lat1);
  const radLon1 = degToRad(lon1);
  const radLat2 = degToRad(lat2);
  const radLon2 = degToRad(lon2);

  const deltaLat = radLat2 - radLat1;
  const deltaLon = radLon2 - radLon1;

  const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
const degToRad = (deg) => {
  return (deg * Math.PI) / 180;
};
export const displayDistance = (kilometers) => {
  if (kilometers < 1) {
    // Convert kilometers to meters (1 kilometer = 1000 meters)
    return (kilometers * 1000)?.toFixed(0) + ' m';
  } else {
    return kilometers?.toFixed(0) + ' km';
  }
};

// Define an async function to fetch and update the salons data
export const fetchSalonsData = (userDetails) => async (dispatch) => {
  try {
    const result = await salon();
    if (result.res) {
      const { data } = result.res; // Destructure 'data' from 'result.res'
      const { salons } = data; // Destructure 'salons' from 'data'
      const userCoordinates = { lat: userDetails?.user?.latitude, lon: userDetails?.user?.longitude };

      const ServicesResponse = await getAllServices();
      let listServices = ServicesResponse?.res.data.data;
      // Create a map of service IDs to their corresponding names
      const serviceMap = {};
      listServices.forEach((service) => {
        serviceMap[service._id] = service.service_name[0];
      });
      // Add the service_name to each salon's services array
      let allSalonsCoordinates=salons.map((e)=>{
        let obj={lat:e.location.coordinates[0],lon:e.location.coordinates[1]}
        return obj
      })
      const calculatedDistances = allSalonsCoordinates?.map((salon) => {
        return calculateDistance(userCoordinates.lat, userCoordinates.lon, salon.lat, salon.lon);
      });
      salons.forEach((salon,i) => {
        salon.services = salon.services.map((serviceId) => ({
          _id: serviceId,
          service_name: serviceMap[serviceId] || "Service Name Not Found", // Provide a default value if service name is not found
        }));
        salon.distances=calculatedDistances[i]
      });

      // Dispatch the 'updateSalonContent' action with the fetched 'salons' data
      dispatch(updateSalonContent(salons));

      // Dispatch the 'updateFilterContent' action with the fetched 'salons' data
      dispatch(updateFilterContent(salons));
    }
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching salons:", error);
  }
};
