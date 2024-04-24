import React from 'react';
import {View, FlatList, Image} from 'react-native';
const MediaList = ({data}: {data: string[]}) => {
  return (
    <FlatList
      numColumns={3}
      renderItem={({item}) => (
        <Image style={{height: 128, width: 128}} source={item} />
      )}
      keyExtractor={item => item}
      data={data}
    />
  );
};

export default MediaList;
