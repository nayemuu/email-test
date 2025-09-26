const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  value: 1,
};

const ButtonSlice = createSlice({
  name: "Button",
  initialState,
  reducers: {
    incrementByOne: (state, action) => {
      state.value = state.value + 1;
    },
  },
});

export const { incrementByOne } = ButtonSlice.actions;
export default ButtonSlice.reducer;
