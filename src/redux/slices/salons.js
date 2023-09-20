import { createSlice } from "@reduxjs/toolkit";
import { salon } from "../../services/salon";
import { getAllServices } from "../../services/Services";

const initialState = {
  salonContent: [], // Initialize salonContent as an empty array
  filterContent: [], // Initialize filterContent as an empty array
};

const salons = createSlice({
  name: "salon",
  initialState,
  reducers: {
    updateSalonContent: (state, action) => {
      state.salonContent = action.payload; // Update salonContent in the state
    },
    updateFilterContent: (state, action) => {
      state.filterContent = action.payload; // Update filterContent in the state
    },
    resetSalonContent: (state) => {
      state.filterContent = state.salonContent; // Reset filterContent to the original salonContent
    },
  },
});

export const { updateSalonContent, updateFilterContent, resetSalonContent } =
  salons.actions;

// Define an async function to fetch and update the salons data
export const fetchSalonsData = () => async (dispatch) => {
  try {
    const result = await salon();
    const { data } = result.res; // Destructure 'data' from 'result.res'
    const { salons } = data; // Destructure 'salons' from 'data'
    const ServicesResponse = await getAllServices();
    let listServices = ServicesResponse?.res.data.data;

    // Create a map of service IDs to their corresponding names
    const serviceMap = {};
    listServices.forEach((service) => {
      serviceMap[service._id] = service.service_name[0];
    });
    // Add the service_name to each salon's services array
    salons.forEach((salon) => {
      salon.services = salon.services.map((serviceId) => ({
        _id: serviceId,
        service_name: serviceMap[serviceId] || "Service Name Not Found", // Provide a default value if service name is not found
      }));
    });
    // Dispatch the 'updateSalonContent' action with the fetched 'salons' data
    dispatch(updateSalonContent(salons));

    // Dispatch the 'updateFilterContent' action with the fetched 'salons' data
    dispatch(updateFilterContent(salons));
  } catch (error) {
    // Handle any errors here
    console.error("Error fetching salons:", error);
  }
};

export default salons.reducer;
