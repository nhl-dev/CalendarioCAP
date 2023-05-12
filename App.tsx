/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';

import { API_URL, AUTH_HEADER } from '@env';

import { NavigationContainer, DarkTheme } from '@react-navigation/native';

import { storeData, getData } from './src/helpers/storageHelper';
import { Datum } from './src/models/Matches';

import Welcome from './src/screens/Welcome';
import BottomTab from './src/navigation/BottomTab';

const HAS_LAUNCHED = 'HAS_LAUNCHED';

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);
  const [matches, setMatches] = useState([] as Datum[]);

  useEffect(() => {
    const getAsyncData = async () => {
      const hasLaunched = await getData(HAS_LAUNCHED);
      if (hasLaunched) {
        setHasLaunched(true);
      } else {
        await storeData(HAS_LAUNCHED, 'true');
      }
    };

    const getPartidos = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: AUTH_HEADER,
        },
      };

      await fetch(`${API_URL}/api/matches?populate=*`, options)
        .then(response => response.json())
        .then(response => setMatches(response.data))
        .catch(err => console.error(err));
    };

    getAsyncData().catch(e => {
      console.log(e);
    });

    getPartidos();
  }, []);

  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      {hasLaunched ? (
        <BottomTab matches={matches} />
      ) : (
        <Welcome hl={setHasLaunched} />
      )}
    </NavigationContainer>
  );
}
