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
  type: 'chat' | 'group_chat' | 'chanel';
  name: string;
  msgs: Msg[];
  pinnedCache: {
    [key: number]: string;
  };
  pinned: {timestamp: number; body: string}[];
  media: string[];
}
export interface TimestampItem {
  timestamp: number;
  body: string;
}
interface RoomSliceState {
  data: RoomItem[];
  find: RoomItem[];
}
const initialState: RoomSliceState = {
  data: [
    {
      id: 1,
      type: 'chat',
      name: 'Олег',
      msgs: [],
      pinnedCache: {},
      pinned: [],
      media: [],
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
    addMedia: (
      state: RoomSliceState,
      action: PayloadAction<{attaches: string[]; user: string}>,
    ) => {
      const items: Msg[] = [];
      const mediaBuffer: string[] = [];
      for (let index = 0; index < action.payload.attaches.length; index++) {
        items.push({
          type: action.payload.attaches[index].type,
          uri: action.payload.attaches[index].uri,
          user: action.payload.user,
          timestamp: Date.now(),
        });
        mediaBuffer.push(action.payload.attaches[index].uri);
      }
      for (let room of state.data) {
        if (room.id === action.payload.roomId) {
          room.msgs.push(...items);
          room.media.push(...mediaBuffer);
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
        type: 'chat',
        name: action.payload.name,
        msgs: [],
        pinnedCache: {},
        pinned: [],
        media: [],
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

export const {addMsg, addMedia, togglePinned, createChat, findActivities} =
  roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
