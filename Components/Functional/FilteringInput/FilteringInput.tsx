import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';

const FilteringInput = ({filteringFunc, delay}) => {
  const [filterValue, setFilterValue] = useState('');
  useEffect(() => {
    const id = setTimeout(() => {
      filteringFunc();
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [filterValue]);

  return (
    <TextInput
      value={filterValue}
      onChangeText={e => {
        setFilterValue(e);
      }}
      placeholder="Поиск"
    />
  );
};

export default FilteringInput;
