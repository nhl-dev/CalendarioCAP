import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { storeData, getData } from './src/helpers/storageHelper';

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
    <View style={styles.container}>
      {hasLaunched ? null : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
