import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  name: 'fakeUser1',
  rooms: [1, 2],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    linkRoom: (state, action) => {
      state.rooms.push(action.payload.id);
    },
  },
});

export const {linkRoom} = userSlice.actions;
export const userReducer = userSlice.reducer;
