import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, AsyncStorage, Image, StyleSheet, ScrollView } from 'react-native';
import socketio from 'socket.io-client';
import SpotList from '../components/SpotList';
import logo from '../../assets/logo.png';

export default function List() {
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.15.18:3333', {
                query: { user_id }
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
            })
        })
    }, []);

    //colocar [] vazio, para fazer apenas uma ação no componente
    useEffect(() => {
        AsyncStorage.getItem('techs').then(storagedTechs => {
            const techsArray = storagedTechs.split(',').map( tech => tech.trim());

            setTechs(techsArray);
        })
    }, []);

    //SafeAreaView é para o conteudo ficar na "area segura" do celular, nao pegar a barra de notificações
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={ logo } />
            <ScrollView>
                {techs.map( tech => <SpotList key={tech} tech={tech} />)}
            </ ScrollView>
        </ SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 30
    },
});