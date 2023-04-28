import { useState, useEffect } from 'react';
import { StatusBar, StyleSheet } from 'react-native';

import { storeData, getData } from './src/helpers/storageHelper';

import Welcome from "./src/screens/Welcome";
import BottomTab from './src/navigation/BottomTab';

import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme } from '@react-navigation/native';

const HAS_LAUNCHED = 'HAS_LAUNCHED';

export default function App() {
  const [hasLaunched, setHasLaunched] = useState(false);

  useEffect(() => {
    const getAsyncData = async () => {
      const hasLaunched = await getData(HAS_LAUNCHED);
      if (hasLaunched) {
        setHasLaunched(true);
      } else {
        await storeData(HAS_LAUNCHED, 'true');
      }
    };

    getAsyncData().catch((e) => {
      console.log(e);
    });
  }, []);

  return (

    <NavigationContainer theme={DarkTheme}>
      <StatusBar
        backgroundColor={'#000'}
        barStyle={'light-content'}
      />
      {hasLaunched
        ? <BottomTab />
        : <Welcome />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
