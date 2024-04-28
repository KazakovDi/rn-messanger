import React, {useRef, useState} from 'react';
import {Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {pick, pickDirectory} from 'react-native-document-picker';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';

const CreateGroup = ({navigation}) => {
  const [imageSource, setImageSource] = useState('');
  const nameRef = useRef(null);
  return (
    <View>
      <NavBar leftBtn={faArrowLeft} leftOnPress={navigation.goBack}>
        <Text>Создать группу</Text>
      </NavBar>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        {imageSource ? (
          <TouchableOpacity>
            <Image
              style={{width: 68, height: 68, borderRadius: 50}}
              source={{uri: imageSource}}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              pick({
                allowMultiSelection: false,
                type: ['image/jpeg', 'image/png'],
                mode: 'open',
              }).then(res => {
                console.log('res', res);
                setImageSource(res[0].uri);
              });
            }}>
            <View
              style={{
                backgroundColor: theme.colors.header,
                borderRadius: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 68,
                height: 68,
              }}>
              <FontAwesomeIcon color={'#fff'} size={30} icon={faCamera} />
            </View>
          </TouchableOpacity>
        )}
        <TextInput
          ref={nameRef}
          onChangeText={e => (nameRef.current.value = e)}
          placeholder="Название канала"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.icon,
            flexGrow: 1,
            marginLeft: 15,
          }}
        />
      </View>
    </View>
  );
};

export default CreateGroup;
