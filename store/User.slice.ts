import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  name: 'fakeUser1',
  rooms: [1, 2],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {setAdress} = shopsSlice.actions;
export const userReducer = userSlice.reducer;
