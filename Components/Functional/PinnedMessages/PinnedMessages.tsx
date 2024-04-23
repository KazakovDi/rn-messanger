import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PinnedMessages = ({data, onPress, keys, pinned}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('pinned', pinned);
  return (
    <View style={{backgroundColor: 'red'}}>
      {pinned[activeIndex] ? (
        <TouchableOpacity
          onPress={() => {
            if (activeIndex === pinned.length - 1) setActiveIndex(0);
            else setActiveIndex(state => state + 1);
            console.log('keys', keys, activeIndex);
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
