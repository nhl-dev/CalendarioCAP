/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  FlatList,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import MatchCard from '../components/MatchCard';

import SafeViewAndroid from '../components/SafeAreaAndroid';
import ModalFilter from '../components/ModalFilter';
import { Datum } from '../models/Matches';

const initialFiltered = [
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

interface Props {
  matches: Datum[];
}

function Home({ matches }: Props) {
  const [sports, setSports] = useState([] as Datum[]);
  const [searchText, setSearchText] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [filteredSports, setFilteredSports] = useState(initialFiltered);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const getMatches = () => {
    const auxMatches: Datum[] = [];

    matches.forEach(match => {
      const sport = match.attributes.sport.data.attributes.name;

      if (filteredSports.some(item => item.id === sport)) {
        auxMatches.push(match);
      }
    });

    auxMatches.sort(
      (a, b) =>
        new Date(a.attributes.date).getTime() -
        new Date(b.attributes.date).getTime(),
    );

    setSports(auxMatches);
  };

  useEffect(() => {
    if (searchText === '') {
      getMatches();
    } else {
      setSports(
        sports.filter(
          item =>
            item.attributes.versus
              .toLowerCase()
              .indexOf(searchText.toLowerCase()) > -1,
        ),
      );
    }
  }, [searchText]);

  useEffect(() => {
    getMatches();
  }, [filteredSports]);

  const handleOrderClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (refreshing) {
      getMatches();
    }
  }, [refreshing]);

  useEffect(() => {
    getMatches();
  }, [matches]);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View style={styles.searchArea}>
        <TextInput
          style={styles.input}
          placeholder="Buscar rival"
          placeholderTextColor="#888"
          value={searchText}
          onChangeText={t => setSearchText(t)}
        />
        <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
          <MaterialCommunityIcons name="sort-variant" size={32} color="#888" />
        </TouchableOpacity>
      </View>

      <ModalFilter
        showModal={showModal}
        setShowModal={setShowModal}
        filtered={filteredSports}
        setFiltered={setFilteredSports}
      />

      <View style={styles.container}>
        <FlatList
          data={sports}
          renderItem={({ item }) => <MatchCard match={item} />}
          keyExtractor={(item, index) => `key${index}`}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272624',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#272624',
  },
  orderButton: {
    width: 32,
    marginRight: 30,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#363636',
    margin: 30,
    borderRadius: 5,
    fontSize: 19,
    paddingLeft: 15,
    paddingRight: 15,
    color: '#FFFFFF',
  },
});
