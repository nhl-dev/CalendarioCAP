/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from 'react-native';

import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';

import { getData, storeData } from '../helpers/storageHelper';
import SafeViewAndroid from '../components/SafeAreaAndroid';

const initialData = {
  football: false,
  basket: false,
  rugby: false,
};

type ObjectKey = keyof typeof initialData;

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

interface sport {
  item: string;
  id: string;
}

interface sports {
  football: boolean;
  basket: boolean;
  rugby: boolean;
}

function Settings() {
  const [selectedSports, setSelectedSports] = useState([] as sport[]);

  const [favSports, setFavSports] = useState({} as sports);

  useEffect(() => {
    const getAsyncData = async () => {
      const sports = await getData('sports');
      setFavSports(JSON.parse(sports!));
    };

    const loadData = () => {
      const auxSelected = [] as sport[];
      Object.keys(favSports).forEach(key => {
        if (favSports[key]) {
          auxSelected.push({ item: '', id: key });
        }
      });
      setSelectedSports(auxSelected);
    };

    getAsyncData();
    loadData();
  }, [favSports]);

  const onSave = async () => {
    const auxSelected = initialData;

    selectedSports.forEach((sport: sport) => {
      const id = sport.id as ObjectKey;
      auxSelected[id] = true;
    });

    await storeData('sports', JSON.stringify(auxSelected));
  };

  function onMultiChange() {
    return item => setSelectedSports(xorBy(selectedSports, [item], 'id'));
  }

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.container}>
        <View style={styles.secondaryContainer}>
          <Text style={styles.welcomeText}>Calendario CAP</Text>
          <Text style={styles.mainText}>Editar favoritos</Text>
          <Image
            source={require('../../assets/img/logo.jpg')}
            style={styles.logo}
          />
        </View>

        <View style={styles.selectContainer}>
          <Text style={styles.bodyText}>
            Selecciona los deportes que quieras seguir:
          </Text>
          <SelectBox
            label=""
            options={selectOptions}
            selectedValues={selectedSports}
            onMultiSelect={onMultiChange()}
            onTapClose={onMultiChange()}
            isMulti
          />
        </View>

        <TouchableOpacity
          onPress={() =>
            onSave().catch(e => {
              console.log(e);
            })
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272624',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    width: '100%',
  },
  secondaryContainer: {
    position: 'absolute',
    top: '0%',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  selectContainer: {
    justifyContent: 'center',
    width: '100%',
    position: 'absolute',
    top: '55%',
  },
  welcomeText: {
    color: '#f0ca0c',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
  },
  mainText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: -60,
  },
  bodyText: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#f0ca0c',
    padding: 10,
    borderRadius: 10,
    width: '70%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
