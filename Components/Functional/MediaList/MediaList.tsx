import React, {useState} from 'react';
import {View, FlatList, Image, Touchable, TouchableOpacity} from 'react-native';
import ImageView from 'react-native-image-view';
const MediaList = ({data}: {data: string[]}) => {
  console.log('MediaList', data);
  const [isOpen, setIsOpen] = useState<null | number>(null);
  const images = data.map(item => {
    return {
      source: {
        uri: item,
      },
    };
  });
  return (
    <>
      <FlatList
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              setIsOpen(index);
            }}>
            <Image style={{height: 128, width: 128}} source={{uri: item}} />
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        data={data}
      />
      <ImageView
        images={images}
        imageIndex={isOpen}
        isVisible={isOpen !== null}
        isSwipeCloseEnabled={true}
        onClose={() => setIsOpen(null)}
      />
    </>
  );
};

export default MediaList;
