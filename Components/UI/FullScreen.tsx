import React from 'react';
import {View} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {RootState, useAppDispatch, useAppSelector} from '../../store/store';

const FullScreen = ({onClose}) => {
  const dispatch = useAppDispatch();
  const videoUri = useAppSelector((state: RootState) => state.rooms.video);
  return (
    <>
      {videoUri ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
          <VideoPlayer
            disableFullscreen
            onBack={onClose}
            source={{uri: videoUri}}
            repeat={true}
          />
        </View>
      ) : null}
    </>
  );
};

export default FullScreen;
