import { configureStore } from "@reduxjs/toolkit";
import scraperReducer from "./scraperSlice";

export const store = configureStore({
  reducer: {
    scraper: scraperReducer,
  },
});
