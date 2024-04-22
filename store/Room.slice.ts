import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      name: 'Олег',
      msgs: [],
      pinned: {},
    },
    {
      id: 2,
      name: 'Daria',
      msgs: [
        {user: 'Daria', body: 'Lorem Ipsum is simply dummy t'},
        {user: 'Daria', body: 'een the industrys standard dummy text '},
        {user: 'Daria', body: 'typesetting industry. Lo'},
        {user: 'fakeUser1', body: 'ext of the printing and '},
        {user: 'fakeUser1', body: 'rem Ipsum has b'},
        {user: 'fakeUser1', body: 'ever since the 1500s, when an unknown'},
        {user: 'Daria', body: 'printer took a galley of type'},
        {user: 'Daria', body: 'and scrambled it to make'},
        {user: 'fakeUser1', body: 'a type specimen book. It'},
        {user: 'Daria', body: 'has survived not only five centuries,'},
        {
          user: 'fakeUser1',
          body: 'ut also the leap into electronic typesetting,',
        },
        {
          user: 'Daria',
          body: 'b remaining essentially unchanged. It was popularised ',
        },
        {
          user: 'fakeUser1',
          body: ' in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,',
        },
        {user: 'fakeUser1', body: ' and more recently with desktop '},
        {
          user: 'Daria',
          body: ' publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        },
      ],
      pinned: {},
    },
  ],
  find: [],
};
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addMsg: (state, action) => {
      for (let room of state.data) {
        if (room.id === action.payload.id) {
          room.msgs.push({
            user: action.payload.user,
            body: action.payload.body,
            timestamp: Date.now(),
          });
          break;
        }
      }
    },
    addImgs: (state, action) => {
      const items = [];

      for (let index = 0; index < action.payload.attaches.length; index++) {
        items.push({
          type: 'img',
          uri: action.payload.attaches[index],
          user: action.payload.user,
          timestamp: Date.now(),
        });
      }
      for (let room of state.data) {
        if (room.id === action.payload.roomId) {
          room.msgs.push(...items);
          break;
        }
      }
    },
    togglePinned: (state, action) => {
      for (let room of state.data) {
        if (action.payload.roomId === room.id) {
          const item = room.pinned[action.payload.key];
          console.log('G', item, action.payload.key);
          if (item) {
            delete room.pinned[action.payload.key];
          } else {
            room.pinned[action.payload.key] = action.payload.body;
          }
          break;
        }
      }
    },
    createChat: (state, action) => {
      state.data.push({
        id: action.payload.id,
        name: action.payload.name,
        msgs: [],
        pinned: {},
      });
    },
    findActivities: (state, action) => {
      if (action.payload.filter === '') {
        state.find = [];
        return;
      }
      state.find = state.data.filter(item => {
        const reg = new RegExp(action.payload.filter, 'gi');
        return reg.test(item.name);
      });
    },
  },
});

export const {addMsg, addImgs, togglePinned, createChat, findActivities} =
  roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
