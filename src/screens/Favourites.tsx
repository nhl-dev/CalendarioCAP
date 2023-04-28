import { FlatList, StyleSheet, View, SafeAreaView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getData } from '../helpers/storageHelper';

import { data } from '../../assets/mock/matches';
import { Match } from '../models/Matches';
import MatchCard from '../components/MatchCard';

import SafeViewAndroid from "../components/SafeAreaAndroid";

interface sports {
    football: boolean;
    basket: boolean;
    rugby: boolean;
}

const Favourites = () => {

    const [sports, setSports] = useState([] as Match[]);
    const [searchText, setSearchText] = useState('');
    const [favSports, setFavSports] = useState({} as sports);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    const getAsyncData = async () => {
        const sports = await getData('sports');
        setFavSports(JSON.parse(sports!));
    };

    const getMatches = () => {
        const auxMatches: Match[] = [];

        Object.keys(data).forEach(function (key, _) {
            const sport = data[key].sport;
            if (favSports[sport]) {
                auxMatches.push(data[key]);
            }
        });
        auxMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setSports(auxMatches);
    }

    useEffect(() => {

        getAsyncData().catch((e) => {
            console.log(e);
        });

        getMatches();

    }, [JSON.stringify(favSports)]);

    useEffect(() => {
        if (searchText === '') {
            getMatches();
        } else {
            setSports(
                sports.filter(
                    (item) =>
                        item.versus.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                )
            );
        }
    }, [searchText]);

    useEffect(() => {
        if (refreshing) {
            getAsyncData().catch((e) => {
                console.log(e);
            });
            getMatches();
        }
    }, [refreshing]);

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>

            <View style={styles.searchArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar rival"
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={(t) => setSearchText(t)}
                />
            </View>

            <View style={styles.container}>
                <FlatList
                    data={sports}
                    renderItem={({ item }) => <MatchCard match={item} />}
                    keyExtractor={(item, index) => 'key' + index}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </SafeAreaView>
    )
}

export default Favourites

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
})