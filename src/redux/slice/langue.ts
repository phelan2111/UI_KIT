import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Langue } from "@/langs";
import type { RootState } from "../store";

export interface ModalState {
  data: Langue;
}

const initialState: ModalState = {
  data: Langue.english,
};

export const langueSlice = createSlice({
  name: "langueSlice",
  initialState,
  reducers: {
    onSetState: (state, action: PayloadAction<ModalState>) => {
      state.data = action.payload.data;
    },
  },
});

export const funcLangue = langueSlice.actions;

export const dataLangue = (state: RootState) => state.langue.data;

export default langueSlice.reducer;
