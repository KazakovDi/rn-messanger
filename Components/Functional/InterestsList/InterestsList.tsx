import React from 'react';
import {FlatList} from 'react-native';
import InterestItem from '../../UI/InterestItem/InterestItem';
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
const InterestsList = () => {
  return (
    <FlatList
      renderItem={({item}) => (
        <InterestItem avatar={item.img} title={item.title} msg={item.lastMsg} />
      )}
      data={data}>
      InterestsList
    </FlatList>
  );
};

export default InterestsList;
