import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  name: "",
  picture: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    initiateProfileInfo: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.picture = action.payload.picture;
    },

    clearProfileInfo: (state) => {
      state.id = "";
      state.name = "";
      state.picture = "";
    },
    clearProfileInfo: () => initialState, // Return initial state directly
  },
});

export const { initiateProfileInfo, clearProfileInfo } = profileSlice.actions;
export default profileSlice.reducer;
