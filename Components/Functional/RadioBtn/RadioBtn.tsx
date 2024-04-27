import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomRadioButton = ({label, selected, onSelect}) => (
  <TouchableOpacity
    style={[
      styles.radioButton,
      {backgroundColor: selected ? '#007BFF' : '#FFF'},
    ]}
    onPress={onSelect}>
    <Text style={[styles.radioButtonText, {color: selected ? '#FFF' : '#000'}]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
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
export default CustomRadioButton;
