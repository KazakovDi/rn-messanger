import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TimestampItem} from '../../../store/Room.slice';
interface IPinnedMessages {
  pinned: TimestampItem[];
  onPress: (arg: number) => void;
}
const PinnedMessages = ({onPress, pinned}: IPinnedMessages) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View
      style={{
        position: 'absolute',
        bottom: -30,
        zIndex: 100,
        width: '100%',
        backgroundColor: 'red',
      }}>
      {pinned[activeIndex] ? (
        <TouchableOpacity
          onPress={() => {
            if (activeIndex === pinned.length - 1) setActiveIndex(0);
            else setActiveIndex(state => state + 1);
            onPress(pinned[activeIndex].timestamp);
          }}>
          <View>
            <Text style={{fontWeight: 700}}>
              Закреплённое сообщение {activeIndex + 1}
            </Text>
            <Text numberOfLines={1}>{pinned[activeIndex].body}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PinnedMessages;
