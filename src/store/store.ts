import seedReducer from "./features/seed/seedSlice";
import walletsReducer from "./features/wallet/walletsSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    seed: seedReducer,
    wallets: walletsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
