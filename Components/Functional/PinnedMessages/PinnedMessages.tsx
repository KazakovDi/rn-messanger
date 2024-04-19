import React, {useState} from 'react';
import {Button, View} from 'react-native';

const PinnedMessages = ({data, onPress, keys}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log('data', data, keys);
  return (
    <View>
      {data.length ? (
        <Button
          title={data[activeIndex]}
          onPress={() => {
            if (activeIndex === data.length - 1) setActiveIndex(0);
            else setActiveIndex(state => state + 1);
            console.log('keys', keys, activeIndex);
            onPress(keys[activeIndex]);
          }}></Button>
      ) : null}
    </View>
  );
};

export default PinnedMessages;
