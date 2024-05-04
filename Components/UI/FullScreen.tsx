import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import {RootState, useAppDispatch, useAppSelector} from '../../store/store';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
const FullScreen = ({onClose, media}) => {
  const dispatch = useAppDispatch();
  const activeMedia = useAppSelector(
    (state: RootState) => state.rooms.activeMedia,
  );
  console.log('video', activeMedia);
  return (
    <>
      {activeMedia ? (
        <View
          style={{
            position: 'absolute',
            zIndex: 999,
            flex: 1,
            width: '100%',
            height: '100%',
          }}>
          {activeMedia.type === 'video/mp4' ? (
            <VideoPlayer
              disableFullscreen
              onBack={onClose}
              source={{uri: activeMedia.uri}}
              repeat={true}
              style={{flex: 1}}
            />
          ) : (
            <>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  zIndex: 999,
                  left: '5%',
                  top: '1%',
                }}
                onPress={onClose}>
                <FontAwesomeIcon color="#000" size={30} icon={faArrowLeft} />
              </TouchableOpacity>

              <Image source={{uri: activeMedia.uri}} style={{flex: 1}} />
            </>
          )}
        </View>
      ) : null}
    </>
  );
};

export default FullScreen;
