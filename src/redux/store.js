import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from './slices/user'
import filterModalReducer from "./slices/filterModals/filterModal"
import salonsReducer from "./slices/salons";
import authChoice from "./slices/authChoice";
import modalReducer from "./slices/modal";
import salonServicesReducer from "./slices/salonServices";
export const store = configureStore({
   reducer: {
      user: userReducer,
      salonModal: filterModalReducer,
      salons: salonsReducer,
      authChoice:authChoice,
      modal: modalReducer,
      salonServices: salonServicesReducer
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);
