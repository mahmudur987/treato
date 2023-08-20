import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from './slices/user'
import filterModalReducer from "./slices/filterModals/filterModal"
import salonsReducer from "./slices/salons";
import authChoice from "./slices/authChoice";
export const store = configureStore({
   reducer: {
      user: userReducer,
      modal: filterModalReducer,
      salons: salonsReducer,
      authChoice:authChoice
   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);
