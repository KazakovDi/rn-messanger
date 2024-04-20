import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      name: 'Олег',
      msgs: [
        // {user: 'Олег', body: 'Текст 1'},
        // {user: 'fakeUser1', body: 'Текст 2 Текст 2 Текст 2 '},
        // {user: 'Олег', body: 'Текст 3 Текст 3 Текст 3'},
        // {user: 'fakeUser1', body: 'rem Ipsum has b'},
        // {user: 'Олег', body: 'een the industrys standard dummy text '},
        // {user: 'fakeUser1', body: 'ever since the 1500s, when an unknown'},
        // {user: 'Олег', body: 'printer took a galley of type'},
        // {user: 'Олег', body: 'and scrambled it to make'},
        // {user: 'fakeUser1', body: 'a type specimen book. It'},
        // {user: 'Олег', body: 'has survived not only five centuries,'},
        // {
        //   user: 'fakeUser1',
        //   body: 'тексе 4',
        // },
        // {
        //   user: 'Олег',
        //   body: 'b remaining essentially unchanged. It was popularised ',
        // },
        // {
        //   user: 'fakeUser1',
        //   body: ' in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,',
        // },
        // {user: 'fakeUser1', body: ' and more recently with desktop '},
        // {
        //   user: 'Олег',
        //   body: 'текст 5',
        // },
      ],
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
          console.log('addMsg', room.msgs);
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
      console.log('s', state.data);

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
      console.log(state.data);
    },
  },
});

export const {addMsg, addImgs, togglePinned} = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
