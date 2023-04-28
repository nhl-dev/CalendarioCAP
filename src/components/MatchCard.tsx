import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Match } from '../models/Matches';

import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
    match: Match;
}


const MatchCard = ({ match }: Props) => {

    console.log(match);


    return (
        <View style={styles.matchCardContainer}>
            <ImageBackground source={{ uri: match.path }} resizeMode="cover" style={styles.image} borderRadius={6}>
                <View style={styles.infoContainer}>
                    <View>
                        <Text style={styles.rivalText}>{match.versus}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="calendar-outline" size={15} color={'#fff'} />
                            <Text style={styles.dateText}>  {new Date(match.date).toLocaleDateString('es-UY')}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="information-circle-outline" size={15} color={'#fff'} />
                            <Text style={styles.text}>  {match.home ? 'Local' : 'Visitante'}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="location-outline" size={15} color={'#fff'} />
                            <Text style={styles.text}>  {match.field}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="trophy-outline" size={15} color={'#fff'} />
                            <Text style={styles.text}>  {match.tournament}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="ticket-outline" size={15} color="white" />
                            <Text style={styles.text}>  {match.tickets}</Text>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 12, right: 12 }}>
                        <Ionicons name={match.icon || 'alert-circle-outline'} size={50} color={'#fff'} />
                    </View>
                </View>
            </ImageBackground >
        </View >
    )
}

export default MatchCard

const styles = StyleSheet.create({
    matchCardContainer: {
        flex: 1,
        borderRadius: 10,
        margin: 10,
        width: '90%',
        alignSelf: 'center',
    },
    image: {
        width: '100%',
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        padding: 15,
        borderColor: 'yellow',
        borderWidth: 1,
    },
    rivalText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    dateText: {
        color: 'white',
        fontSize: 18,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});