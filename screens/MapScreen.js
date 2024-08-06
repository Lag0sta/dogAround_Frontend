import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
} from "react-native";

import FontAwesome from 'react-native-vector-icons/FontAwesome6'

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import { useSelector, useDispatch } from 'react-redux';
import { importPlaces } from '../reducers/places'

export default function MapScreen({ navigation }) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.value); //Recuperation paramètres de l'utilsateur stocké dans le STORE
    const places = useSelector((state) => state.places.value); //Recuperation des places dans le STORE
    const [currentPosition, setCurrentPosition] = useState({ "latitude": 48.866667, "longitude": 2.333333 }); //Déclaration état contenant la position de l'utisateur

    useEffect(() => {
        //Demande autorisation partage location du téléphone
        (async () => {
            const result = await Location.requestForegroundPermissionsAsync();
            const status = result.status;

            if (status === 'granted') {
                //Récupération location du téléphone
                Location.watchPositionAsync({ distanceInterval: 10 },
                    (location) => {
                        const params = {
                            longitude: location.coords.longitude,
                            latitude: location.coords.latitude,
                            radius: user.radius,
                        };

                        //Récupération des points d'intérêts autour de l'utilisateur
                        fetch(`${process.env.EXPO_PUBLIC_BACKEND_ADDRESS}/places/${params.latitude}/${params.longitude}/${params.radius}`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                data.result && dispatch(importPlaces(data.places));
                            });

                        setCurrentPosition(location.coords);
                    });
            }
        })();
    }, []);

    //Affichage des markers
    const markers = places.map((e, i) => {
        console.log(e);
        let iconName = '';
        let iconColor = '#000000';

        if (e.type === 'event') {
            iconName = 'calendar';
        }
        else if (e.type === 'favori') {
            iconName = 'heart';
        }
        else if (e.type === 'parc') {
            iconName = 'tree';
            iconColor = '#00AA00';
        }
        else if (e.type === 'animalerie') {
            iconName = 'bone';
            iconColor = '#f2f473';
        }
        else if (e.type === 'veterinaire') {
            iconName = 'house-medical';
            iconColor = '#FF0000';
        }
        else if (e.type === 'eau') {
            iconName = 'faucet';
            iconColor = '#0000FF';
        }
        else if (e.type === 'air') {
            iconName = 'paw';
            iconColor = '#795C5F';
        }
        else if (e.type === 'restaurant') {
            iconName = 'location-dot';
            iconColor = '#FF0000';
        }
        else if (e.type === 'like') {
            iconName = 'location-dot';
            iconColor = '#FF0000';
        }
        else {
            iconName = 'location-dot';
            iconColor = '#FF0000';
        }

        return (
            <Marker key={i + 1} coordinate={e.location} title={e.Id}>
                <FontAwesome name={iconName} size={40} color={iconColor}/>
            </Marker>
        )
    })

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={{
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {currentPosition &&
                    <Marker style={styles.maposition} coordinate={currentPosition} title="Ma position" pinColor="#fecb2d">
                        <Image
                            source={require("../assets/avatars/chien_1.png")}
                            style={{ width: 40, height: 40, resizeMode: "contain" }}
                        />
                    </Marker>}
                {markers}
            </MapView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    maposition: {

    },
});
