import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

const PinnedMessages = ({data, onPress, keys, pinned}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('data', data, keys);
  console.log('PinnedMessages', pinned, Object.values(pinned));
  for (let key in pinned) {
    console.log('key', key, pinned[key]);
  }
  return (
    <View style={{backgroundColor: 'red'}}>
      {data[activeIndex] ? (
        <TouchableOpacity
          onPress={() => {
            if (activeIndex === data.length - 1) setActiveIndex(0);
            else setActiveIndex(state => state + 1);
            console.log('keys', keys, activeIndex);
            onPress(keys[activeIndex]);
          }}>
          <View>
            <Text style={{fontWeight: 700}}>
              Закреплённое сообщение {activeIndex + 1}
            </Text>
            <Text numberOfLines={1}>{data[activeIndex]}</Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PinnedMessages;
