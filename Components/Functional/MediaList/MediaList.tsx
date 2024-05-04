import React, {useState} from 'react';
import {View, FlatList, Image, Touchable, TouchableOpacity} from 'react-native';
import {removeMediaScreen, setMediaScreen} from '../../../store/Room.slice';
import {useAppDispatch} from '../../../store/store';
import Video from 'react-native-video';
import FullScreen from '../../UI/FullScreen';

const MediaList = ({data}: {data: string[]}) => {
  console.log('MediaList', data);
  const dispatch = useAppDispatch();
  return (
    <>
      <FlatList
        numColumns={3}
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              dispatch(setMediaScreen({type: item.type, uri: item.uri}));
            }}>
            {item.type === 'video/mp4' ? (
              <Video
                // Can be a URL or a local file.
                source={{uri: item.uri}}
                // Store reference
                style={{width: 128, height: 128}}
                // Callback when remote video is buffering
              />
            ) : (
              <Image
                style={{height: 128, width: 128}}
                source={{uri: item.uri}}
              />
            )}
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
        data={data}
      />
    </>
  );
};

export default MediaList;
