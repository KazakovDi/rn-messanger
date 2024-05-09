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
  members?: [];
  roomInfo: {
    [key: string]: {
      data: any;
      label: string;
    };
  };
  link?: string;
  privacyType?: 'public' | 'private';
  pinnedCache: {
    [key: number]: string;
  };
  avatarUrl?: '';
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
  activeMedia: {
    uri: string;
    type: string;
  } | null;
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
      roomInfo: {
        phoneNumber: {
          label: 'Номер телефона',
          data: '+38068392340',
        },
        nick: {
          label: 'Ник',
          data: '@Oleg',
        },
      },
    },
  ],
  find: [],
  activeMedia: null,
};
const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    addMsg: (
      state: RoomSliceState,
      action: PayloadAction<{user: string; body: string}>,
    ) => {
      if (!action.payload.body) return;
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
        mediaBuffer.push(action.payload.attaches[index]);
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
        type: action.payload.type,
        name: action.payload.name,
        roomInfo: action.payload.roomInfo ? action.payload.roomInfo : {},
        members: action.payload.members,
        avatarUrl: action.payload.avatarUrl,
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
    addMembers: (state, action) => {
      const {id, members} = action.payload;
      for (let room of state.data) {
        if (room.id === id) {
          room.members.push(...members);
        }
      }
    },
    removeActivity: (state, action) => {
      const filtered = state.data.filter(room => room.id !== action.payload.id);
      state.data = [...filtered];
    },

    setMediaScreen: (state, action) => {
      state.activeMedia = {
        uri: action.payload.uri,
        type: action.payload.type,
      };
    },
    removeMediaScreen: state => {
      state.activeMedia = null;
    },
    editRoomInfo: (state, action) => {
      const {id, ...payload} = action.payload;
      for (let room of state.data) {
        if (room.id === id) {
          for (let key in payload) {
            room.roomInfo[key] = payload[key];
          }
          return;
        }
      }
    },
  },
});

export const {
  addMsg,
  addMedia,
  addMembers,
  togglePinned,
  createChat,
  findActivities,
  setMediaScreen,
  removeActivity,
  removeMediaScreen,
  editRoomInfo,
} = roomsSlice.actions;
export const roomsReducer = roomsSlice.reducer;
