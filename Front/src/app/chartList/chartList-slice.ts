import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItem, IListState } from './chartList-types'



const initialState: IListState = { 
  items: []
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addChart(state, action: PayloadAction<IItem>) {
      state.items.push(action.payload);
    },
    delChart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  },
});



export const { addChart, delChart } = listSlice.actions;
export default listSlice.reducer;
