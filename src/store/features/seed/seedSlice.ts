import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SeedState {
  mnemonic: string;
  seed: string;
  saved: boolean;
}

const initialState: SeedState = {
  mnemonic: "",
  seed: "",
  saved: false,
};

export const seedSlice = createSlice({
  name: "seed",
  initialState,
  reducers: {
    setSeed: (_, action: PayloadAction<SeedState>) => {
      return {
        mnemonic: action.payload.mnemonic,
        seed: action.payload.seed,
        saved: false,
      };
    },
    updateSeedSaved: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        saved: action.payload,
      };
    },
  },
});

export const { setSeed, updateSeedSaved } = seedSlice.actions;

export default seedSlice.reducer;
