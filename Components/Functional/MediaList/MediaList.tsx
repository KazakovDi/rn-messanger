import React from 'react';
import {View, FlatList, Image} from 'react-native';
const MediaList = ({data}: {data: string[]}) => {
  console.log('MediaList', data);
  return (
    <FlatList
      numColumns={3}
      renderItem={({item}) => (
        <Image
          style={{borderColor: 'red', borderWidth: 1, height: 128, width: 128}}
          source={{uri: item}}
        />
      )}
      keyExtractor={item => item}
      data={data}
    />
  );
};

export default MediaList;
