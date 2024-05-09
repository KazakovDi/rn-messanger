import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from '@rneui/themed';

interface RadioProps {
  label: string;
  description: string;
  selected: boolean;
  onSelect: () => void;
}

const CustomRadioButton = ({
  label,
  description,
  selected,
  onSelect,
}: RadioProps) => {
  const {theme} = useTheme();

  return (
    <TouchableOpacity style={{paddingVertical: 8}} onPress={onSelect}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View
          style={{
            borderWidth: 1,
            height: 16,
            width: 16,
            borderRadius: 50,
            borderColor: theme.colors.header,
            backgroundColor: selected ? theme.colors.header : 'transparent',
            marginTop: 5,
          }}></View>
        <View style={{display: 'flex', marginLeft: 10}}>
          <Text style={{fontWeight: '500'}}>{label}</Text>
          <Text>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
