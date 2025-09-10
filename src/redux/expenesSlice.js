import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    setExpenses: (state, action) => {
      state.items = action.payload;
    },
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
  },
});

export const { setExpenses, addExpense } = expenseSlice.actions;
export default expenseSlice.reducer;