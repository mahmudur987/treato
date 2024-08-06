import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

export const getReadableAddress = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
    );

    if (response.data.status === "OK") {
      const addressComponents = response.data.results[0].address_components;
      const formattedAddress = addressComponents
        .map((component) => component.long_name)
        .join(", ");

      return formattedAddress;
    } else {
      throw new Error("Failed to fetch address");
    }
  } catch (error) {
    console.error(error);
    return "Unknown location";
  }
};
