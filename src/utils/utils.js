import { updateFilterContent, updateSalonContent } from "../redux/slices/salons"
import { getAllServices } from "../services/Services"
import { salon } from "../services/salon"

export const getFormattedDate = argDate => {
   const date = new Date(argDate)
   if (argDate === undefined) return "-"
   let year = date.getFullYear()
   let month = date.getMonth()
   let dateNum = date.getDate()
   month = month + 1
   if (month < 10) {
      month = `0${month}`
   }
   if (dateNum < 10) {
      dateNum = `0${dateNum}`
   }
   let dateFormatted = `${year}-${month}-${dateNum}`
   return dateFormatted
}


// Define an async function to fetch and update the salons data
export const fetchSalonsData = () => async (dispatch) => {
   try {
     const result = await salon();
     if(result.res){
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
    }
   } catch (error) {
     // Handle any errors here
     console.error("Error fetching salons:", error);
   }
 };
 