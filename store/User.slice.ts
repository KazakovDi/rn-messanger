import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  name: 'fakeUser1',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {linkRoom} = userSlice.actions;
export const userReducer = userSlice.reducer;
