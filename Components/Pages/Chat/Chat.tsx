import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Avatar, Input, Icon} from '@rneui/themed';

const title = 'Олег';
const Chat = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <FontAwesomeIcon size={25} icon={faArrowLeft} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Info')}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignContent: 'center',
              paddingVertical: 10,
              paddingLeft: 10,
            }}>
            <Avatar
              size={64}
              rounded
              title={title[0] + title[1]}
              containerStyle={{backgroundColor: '#6733b9'}}
            />
            <View style={{marginLeft: 15, paddingVertical: 6}}>
              <Text style={{fontWeight: 700}}>{title}</Text>
              <Text>Был(а) недавно</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <Text>Chat</Text>
      <Input
        placeholder="Сообщение"
        rightIcon={{type: 'ionicon', name: 'chevron-left'}}
        // inputStyle={{backgroundColor: '#c7c7c7'}}
        inputContainerStyle={{backgroundColor: '#c7c7c7', borderRadius: 10}}
      />
    </View>
  );
};

export default Chat;
