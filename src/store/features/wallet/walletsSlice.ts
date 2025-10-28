import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface SingleWalletState {
  path: string;
  walletName: string;
  address: string;
  privateKey: string;
  publicKey: string;
}

interface WalletsState {
  [accountNumber: string]: SingleWalletState[];
}

const initialState: WalletsState = {};

export const walletsSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    addWallets: (
      state,
      action: PayloadAction<{
        accountName: string;
        wallets: SingleWalletState[];
      }>
    ) => {
      return {
        ...state,
        [action.payload.accountName.toLowerCase()]: action.payload.wallets,
      };
    },
    removeWallets: () => {
      return {};
    },
    removeSingleWallet: (
      state,
      action: PayloadAction<{
        accountName: string;
        address: string;
      }>
    ) => {
      const { accountName, address } = action.payload;
      const key = accountName.toLowerCase();

      if (!state[key]) return;

      state[key] = state[key].filter((wallet) => wallet.address !== address);

      if (state[key].length === 0) {
        delete state[key];
      }
    },
    removeWallet: (
      state,
      action: PayloadAction<{
        accountName: string;
      }>
    ) => {
      const { accountName } = action.payload;

      const key = accountName.toLowerCase();

      if (!state[key]) {
        return;
      }

      delete state[key];
    },
  },
});

export const { addWallets, removeWallets, removeSingleWallet, removeWallet } =
  walletsSlice.actions;

export default walletsSlice.reducer;
