import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {TimestampItem} from '../../../store/Room.slice';
import {useThemeMode, useTheme} from '@rneui/themed';

interface IPinnedMessages {
  pinned: TimestampItem[];
  onPress: (arg: number) => void;
}
const PinnedMessages = ({onPress, pinned}: IPinnedMessages) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const {theme} = useTheme();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: -40,
        zIndex: 100,
        width: '100%',
        backgroundColor: theme.colors.pinnedbgPrimary,
      }}>
      {pinned[activeIndex] ? (
        <TouchableOpacity
          onPress={() => {
            if (activeIndex === pinned.length - 1) setActiveIndex(0);
            else setActiveIndex(state => state + 1);
            onPress(pinned[activeIndex].timestamp);
          }}>
          <View style={{paddingVertical: 2, paddingHorizontal: 5}}>
            <Text style={{fontWeight: '700', color: theme.colors.primary}}>
              Закреплённое сообщение {activeIndex + 1}
            </Text>
            <Text style={{color: theme.colors.primary}} numberOfLines={1}>
              {pinned[activeIndex].body}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PinnedMessages;
