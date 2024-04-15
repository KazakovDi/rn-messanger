import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import InterestItem from '../../UI/InterestItem/InterestItem';

import {RootState, useAppSelector} from '../../../store/store';

const data = [
  {
    img: '#',
    title: 'Victor',
    lastMsg:
      'Some test message here for testing list item length and some additional text here',
    key: 1,
  },
  {
    img: '#',
    title: 'Eugenii',
    lastMsg:
      'Some test message here for testing list item length and some additional text here',
    key: 2,
  },
  {
    img: '#',
    title: 'Dasha',
    lastMsg:
      'Some test message here for testing list item length and some additional text here',
    key: 3,
  },
  {
    img: '#',
    title: 'Dasha',
    lastMsg:
      'Some test message here for testing list item length and some additional text here',
    key: 4,
  },
  {
    img: '#',
    title: 'Dasha',
    lastMsg:
      'Some test message here for testing list item length and some additional text here Some test message here for testing list item length and some additional text hereSome test message here for testing list item length and some additional text hereSome test message here for testing list item length and some additional text hereSome test message here for testing list item length and some additional text here',
    key: 5,
  },
  {
    img: '#',
    title: 'Dasha',
    lastMsg:
      'Some test message here for testing list item length and some additional text here',
    key: 6,
  },
];
const InterestsList = ({navigation}) => {
  const rooms = useAppSelector((state: RootState) => {
    return state.user.rooms.map(item => {
      for (let room of state.rooms.data) {
        console.log('item', item, room.id);
        if (room.id == item)
          return {
            title: room.name,
            lastMsg: room.msgs[room.msgs.length - 1].body,
            id: room.id,
          };
      }
    });
  });
  console.log('room', rooms);
  return (
    <FlatList
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Chat', {roomId: item.id});
          }}>
          <InterestItem title={item.title} msg={item.lastMsg} />
        </TouchableOpacity>
      )}
      data={rooms}>
      InterestsList
    </FlatList>
  );
};

export default InterestsList;
