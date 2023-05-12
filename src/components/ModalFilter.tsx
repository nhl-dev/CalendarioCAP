/* eslint-disable @typescript-eslint/no-use-before-define */

import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

interface sports {
  any: boolean;
  basket: boolean;
  rugby: boolean;
}

interface Props {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  filtered: [];
  setFiltered: any;
}

const selectOptions = [
  {
    item: 'Fútbol',
    id: 'football',
  },
  {
    item: 'Basketball',
    id: 'basket',
  },
  {
    item: 'Rugby',
    id: 'rugby',
  },
];

function ModalFilter({
  showModal,
  setShowModal,
  filtered,
  setFiltered,
}: Props) {
  function onMultiChange() {
    return item => setFiltered(xorBy(filtered, [item], 'id'));
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={showModal}
      onRequestClose={() => {
        setShowModal(false);
      }}
    >
      <View style={styles.modal}>
        <Text style={styles.text}>Filtrar</Text>
        <View style={styles.selectContainer}>
          <SelectBox
            label=""
            options={selectOptions}
            selectedValues={filtered}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowModal(false)}
        >
          <Ionicons name="checkmark-circle" size={80} color="yellow" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default ModalFilter;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#272624',
    padding: 20,
    paddingTop: '25%',
  },
  text: {
    fontSize: 36,
    color: '#fff',
  },
  selectContainer: {
    justifyContent: 'center',
    width: '100%',
    marginBottom: 120,
    marginTop: 40,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
