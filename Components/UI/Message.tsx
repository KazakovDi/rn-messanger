import React, {useRef} from 'react';
import {View, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import Video, {VideoRef} from 'react-native-video';
import {useTheme} from '@rneui/themed';
// import VideoPlayer from 'react-native-video-controls';
const Message = ({isUser, type, uri, body, onLongPress}) => {
  console.log('supirtype', type, uri);
  const {theme} = useTheme();
  const videoRef = useRef<VideoRef>(null);
  return (
    <TouchableOpacity delayPressIn={500} onLongPress={onLongPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          justifyContent: !isUser ? 'flex-start' : 'flex-end',
          marginVertical: 8,
        }}>
        <View
          style={{
            backgroundColor: !isUser
              ? theme.colors.msgOpposite
              : theme.colors.msg,
            width: '80%',
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          {type === 'image/jpeg' ? (
            <Image
              source={{
                uri: uri,
              }}
              style={{width: '100%', height: 350}}
            />
          ) : type === 'video/mp4' ? (
            <Text>Говно</Text>
          ) : (
            // <TouchableOpacity
            //   onPress={() => {
            //     // console.log(
            //     //   'current',
            //     //   videoRef.current.presentFullscreenPlayer,
            //     // );
            //     console.log('tap');
            //   }}>
            //   <Video
            //     // Can be a URL or a local file.
            //     source={{uri: uri}}
            //     // Store reference
            //     repeat={true}
            //     volume={0}
            //     fullscreen={true}
            //     ref={videoRef}
            //     style={{
            //       width: '100%',
            //       height: 350,
            //     }}
            //     // Callback when remote video is buffering
            //   />
            // </TouchableOpacity>
            <Text style={{color: theme.colors.primary}}>{body}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Message;
