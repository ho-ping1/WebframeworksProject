import { useContext, useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Image, Alert, Pressable, ScrollView } from "react-native"
import { Coordinates, Wine } from "../types";
import * as ImagePicker from 'expo-image-picker';
import { DataContext } from "./DataProvider";
import EvilIcons from '@expo/vector-icons/EvilIcons';

const NewWineForm = () => {
    const { wines, setWines } = useContext(DataContext);
    const [wine, setWine] = useState<string>("");
    const [winery, setWinery] = useState<string>("");
    const [country, setCountry] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);;
    const [image, setImage] = useState<string>("");

    const PickImage = async () => {
      // No permissions request is necessary for launching the image library
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera access is required to take photos.");
        return;
        }
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
  
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const Submit = async () => {
        const postData: Wine = {
            winery: winery,
            wine: wine,
            rating: {
                average: "0",
                reviews: "0 ratings",
            },
            location: country,
            coordinates: {
                latitude: latitude,
                longitude: longitude,
            },
            image: image,
            id: wines.length + 1
        };

        const baseURL = "https://sampleapis.assimilate.be/wines/reds";
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNTMyNEBhcC5iZSIsImlhdCI6MTczNDI3Nzk0NX0.pLImlOlUePIcXI_tq7wOYwRRd-qHiQDi9xNldtvJvtY',  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        console.log('Payload being sent:', JSON.stringify(postData));
        console.log(response)
        const data = await response.json();
        console.log('Response from server:', data);
        setWine("");
        setWinery("");
        setCountry("");
        setLatitude(0);
        setLongitude(0);
        setImage("");
        setWines([...wines, data]);
    }

    useEffect(() => {
        const loadWines = async() => {
            try {  
                const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNTMyNEBhcC5iZSIsImlhdCI6MTczNDI3Nzk0NX0.pLImlOlUePIcXI_tq7wOYwRRd-qHiQDi9xNldtvJvtY' };
                const baseURL = "https://sampleapis.assimilate.be/wines/reds";
                let response = await fetch(baseURL, {headers});
                if (!response.ok){
                    throw new Error(`Failed to fetch ${response.status}, ${response.statusText}`)
                }
                let wines: Wine[] = await response.json();
                setWines(wines);   
            } catch (error) {
                console.log("Error", error)
            }
        }
        loadWines();
    }, [wines]);

    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.text}>Name:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Emporda 2012"
                keyboardType="default"
                onChangeText={text => setWine(text)}
                value={wine}
            />
            <Text style={styles.text}>Winery:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Ernesto Ruffo"
                keyboardType="default"
                onChangeText={text => setWinery(text)}
                value={winery}
            />
            <Text style={styles.text}>Country:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Spain, Empordà"
                keyboardType="default"
                onChangeText={text => setCountry(text)}
                value={country}
            />
            <Text style={styles.text}>Latitude:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Latitude"
                keyboardType="numeric"
                onChangeText={text => setLatitude(Number(text))}
            />
            <Text style={styles.text}>Longitude:</Text>
            <TextInput
                style={styles.input}
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Longitude"
                keyboardType="numeric"
                onChangeText={text => setLongitude(Number(text))}
            />
            {image ? <Image source={{ uri: image }} style={styles.image} /> : <View style={styles.emptyImage}><EvilIcons name="image" size={150} color="black" /></View>}
            <Pressable onPress={PickImage}>
                <Text style={styles.upload}>Upload</Text>
            </Pressable> 
            <Pressable onPress={Submit}>
                <Text style={styles.submit}>Submit</Text>
            </Pressable> 
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {  
      width: 300,
      height: 400,
      borderWidth: 1,
      alignSelf: "center",
      marginTop: 20
    },
    emptyImage: {
      width: 300,
      height: 200,
      borderWidth: 1,
      alignSelf: "center",
      paddingLeft: 75,
      paddingTop: 20,
      marginTop: 20
    },
    text: {
        fontWeight: "bold",
        paddingTop: 7,
        paddingBottom: 7
    },
    input: {
        borderWidth: 1,
        padding: 5
    },
    upload: {
        fontSize: 14,
        textAlign: "center",
        backgroundColor: "#8E041A",
        color: "white",
        marginLeft: 250,
        marginRight: 60,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,

    },
    submit: {
        fontSize: 18,
        textAlign: "center",
        backgroundColor: "#8E041A",
        color: "white",
        marginLeft: 100,
        marginRight: 100,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderWidth: 1,
        marginTop: 20,
        marginBottom: 5
    }
  });


export default NewWineForm;