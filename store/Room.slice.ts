import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
  data: [
    {
      id: 1,
      name: 'Олег',
      msgs: [
        {user: 'Олег', body: 'Lorem Ipsum is simply dummy t'},
        {user: 'fakeUser1', body: 'ext of the printing and '},
        {user: 'Олег', body: 'typesetting industry. Lo'},
        {user: 'fakeUser1', body: 'rem Ipsum has b'},
        {user: 'Олег', body: 'een the industrys standard dummy text '},
        {user: 'fakeUser1', body: 'ever since the 1500s, when an unknown'},
        {user: 'Олег', body: 'printer took a galley of type'},
        {user: 'Олег', body: 'and scrambled it to make'},
        {user: 'fakeUser1', body: 'a type specimen book. It'},
        {user: 'Олег', body: 'has survived not only five centuries,'},
        {
          user: 'fakeUser1',
          body: 'ut also the leap into electronic typesetting,',
        },
        {
          user: 'Олег',
          body: 'b remaining essentially unchanged. It was popularised ',
        },
        {
          user: 'fakeUser1',
          body: ' in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,',
        },
        {user: 'fakeUser1', body: ' and more recently with desktop '},
        {
          user: 'Олег',
          body: 'Aldus PageMaker including versions of Lorem Ipsum.',
        },
      ],
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
        });
      }
      for (let room of state.data) {
        if (room.id === action.payload.roomId) {
          room.msgs.push(...items);
          break;
        }
      }
    },
  },
});

export const {addMsg, addImgs} = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
