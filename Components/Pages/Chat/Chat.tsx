import React, {useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, FlatList, TextInput} from 'react-native';
import {Avatar} from '@rneui/themed';

import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faCircleArrowRight';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
// import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ChatInput from '../../Functional/ChatInput/ChatInput';
import Message from '../../UI/Message';
// import {RNCamera} from 'react-native-camera';

import {RootState, useAppDispatch, useAppSelector} from '../../../store/store';
import {addMsg, addImgs, togglePinned} from '../../../store/Room.slice';
import PinnedMessages from '../../Functional/PinnedMessages/PinnedMessages';
const Chat = ({navigation: {navigate}, route}) => {
  const dispatch = useAppDispatch();

  const [title, msgs, roomId, pinned] = useAppSelector((state: RootState) => {
    for (let room of state.rooms.data) {
      if (room.id === route.params.roomId)
        return [room.name, room.msgs, room.id, room.pinned];
    }
  });
  console.log('pin', pinned);
  const User = useAppSelector((state: RootState) => state.user.name);
  const listRef = useRef(null);
  useEffect(() => {
    listRef.current.scrollToEnd();
  }, []);
  const sendMsgHandler = (msg: string, attached) => {
    dispatch(addMsg({user: User, body: msg, id: roomId}));
    dispatch(addImgs({user: User, roomId: roomId, attaches: attached}));
    listRef.current.scrollToEnd();
  };
  return (
    <View style={{display: 'flex', flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigate('Home')}>
          <FontAwesomeIcon size={25} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Info')}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <Avatar
              size={64}
              rounded
              title={title[0] + title[1]}
              containerStyle={{backgroundColor: '#6733b9'}}
            />
            <View style={{marginLeft: 15, paddingVertical: 6}}>
              <Text style={{fontWeight: 700}}>{title}</Text>
              <Text>Был(а) недавно</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <PinnedMessages
        onPress={key => {
          // console.log('index', index);
          // listRef.current.scrollToIndex(Number(index));
          for (let index = 0; index < msgs.length; index++) {
            if (msgs[index].timestamp == key) {
              console.log('index', index);
              listRef.current.scrollToIndex({index});
              break;
            }
          }
        }}
        data={Object.values(pinned)}
        keys={Object.keys(pinned)}
        pinned={pinned}
      />
      <View style={{flexShrink: 2, marginHorizontal: 10}}>
        <FlatList
          ref={listRef}
          keyExtractor={(item, index) => item.timestamp}
          data={msgs}
          renderItem={({item, index}) => (
            <Message
              key={item.timestamp}
              onLongPress={() => {
                dispatch(
                  togglePinned({roomId, key: item.timestamp, body: item.body}),
                );
              }}
              isUser={item.user === User}
              type={item.type}
              uri={item.uri}
              body={item.body}
            />
          )}
          getItemLayout={(data, index) => ({
            length: 50,
            offset: 500 * index,
            index,
          })}
        />
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          request(PERMISSIONS.ANDROID.CAMERA).then(res => {
            takePicture().then(res => {
              // bottomSheetRef.current.close();
              console.log('res', res);
            });
          });
        }}
        onLongPress={() => {
          request(PERMISSIONS.ANDROID.CAMERA).then(res => {
            record();
          });
        }}
        delayLongPress={500}>
        <Text>Media</Text>
      </TouchableOpacity> */}
      <ChatInput onSendMsg={sendMsgHandler} />
    </View>
  );
};

export default Chat;
