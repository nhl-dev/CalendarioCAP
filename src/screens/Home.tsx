import { FlatList, StyleSheet, View, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { data } from '../../assets/mock/matches';
import { Match } from '../models/Matches';
import MatchCard from '../components/MatchCard';

import SafeViewAndroid from "../components/SafeAreaAndroid";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ModalFilter from '../components/ModalFilter';

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

const Home = () => {

    const [sports, setSports] = useState([] as Match[]);
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

        const auxMatches: Match[] = [];
        Object.keys(data).forEach(function (key, _) {
            const sport = data[key].sport;
            if (filteredSports.some((item) => item.id === sport)) {
                console.log('hola');

                auxMatches.push(data[key]);
            }
        });
        auxMatches.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setSports(auxMatches);
    }

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

        getMatches();

    }, [JSON.stringify(filteredSports)]);

    const handleOrderClick = () => {
        setShowModal(true);
    };

    useEffect(() => {
        if (refreshing) {
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
                <TouchableOpacity onPress={handleOrderClick} style={styles.orderButton}>
                    <MaterialCommunityIcons
                        name="sort-variant"
                        size={32}
                        color="#888"
                    />
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
                    keyExtractor={(item, index) => 'key' + index}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            </View>
        </SafeAreaView>
    )
}

export default Home

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
})