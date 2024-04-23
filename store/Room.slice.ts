import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
interface Msg {
  user: string;
  body?: string;
  timestamp: number;
  type?: 'img';
  uri?: string;
}
interface RoomItem {
  id: number;
  name: string;
  msgs: Msg[];
  pinnedCache: {
    [key: number]: string;
  };
  pinned: {timestamp: number; body: string}[];
}
interface RoomSliceState {
  data: RoomItem[];
  find: RoomItem[];
}
const initialState: RoomSliceState = {
  data: [
    {
      id: 1,
      name: 'Олег',
      msgs: [],
      pinnedCache: {},
      pinned: [],
    },
  ],
  find: [],
};
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addMsg: (
      state: RoomSliceState,
      action: PayloadAction<{user: string; body: string}>,
    ) => {
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
    addImgs: (
      state: RoomSliceState,
      action: PayloadAction<{attaches: string[]; user: string}>,
    ) => {
      const items: Msg[] = [];

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
    togglePinned: (
      state: RoomSliceState,
      action: PayloadAction<{key: number; roomId: number}>,
    ) => {
      for (let room of state.data) {
        if (action.payload.roomId === room.id) {
          const item = room.pinnedCache[action.payload.key];
          console.log('item', item);
          if (item) {
            room.pinned = [
              ...room.pinned.filter(
                pinnedItem => pinnedItem.timestamp != action.payload.key,
              ),
            ];
            delete room.pinnedCache[action.payload.key];
          } else {
            room.pinnedCache[action.payload.key] = action.payload.body;
            room.pinned.push({
              timestamp: action.payload.key,
              body: action.payload.body,
            });
            room.pinned.sort((a, b) => b.timestamp - a.timestamp);
          }
          break;
        }
      }
    },
    createChat: (
      state: RoomSliceState,
      action: PayloadAction<{id: number; name: string}>,
    ) => {
      state.data.push({
        id: action.payload.id,
        name: action.payload.name,
        msgs: [],
        pinnedCache: {},
        pinned: [],
      });
    },
    findActivities: (
      state: RoomSliceState,
      action: PayloadAction<{filter: string}>,
    ) => {
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
