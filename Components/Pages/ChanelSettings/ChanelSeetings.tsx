import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import NavBar from '../../Functional/NavBar/NavBar';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons/faArrowLeft';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import CustomRadioButton from '../../Functional/RadioBtn/RadioBtn';
import {useAppDispatch} from '../../../store/store';
import {createChat} from '../../../store/Room.slice';
const ChanelSettings = ({navigation, route}) => {
  const [selectedValue, setSelectedValue] = useState(null);
  const linkRef = useRef(null);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.container}>
      <NavBar
        leftBtn={faArrowLeft}
        leftOnPress={navigation.goBack}
        rightBtn={faCheck}
        rightOnPress={() => {
          navigation.navigate('Home');
        }}>
        <Text style={{marginLeft: 20, color: '#fff', fontWeight: '700'}}>
          Создать канал
        </Text>
      </NavBar>
      <CustomRadioButton
        label="Публичный"
        selected={selectedValue === 'public'}
        onSelect={() => setSelectedValue('public')}
      />
      <CustomRadioButton
        label="Частный"
        selected={selectedValue === 'private'}
        onSelect={() => setSelectedValue('private')}
      />
      <TextInput
        ref={linkRef}
        onChangeText={e => (linkRef.current.value = e)}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  radioButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#007BFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
  },
  radioButtonText: {
    fontSize: 16,
  },
});

export default ChanelSettings;
