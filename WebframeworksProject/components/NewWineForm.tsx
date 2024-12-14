import { useContext, useEffect, useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, Image } from "react-native"
import { Coordinates, Wine } from "../types";
import * as ImagePicker from 'expo-image-picker';
import { DataContext } from "./DataProvider";

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
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images', 'videos'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczNDE3OTI1Mn0.yg7or_yACESMbF93I-UwbBelwFh_C2MQCzUEFkVtT_Y',  
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
        setWines([...wines, data])
    }

    return (
        <View>
            <Text>Name:</Text>
            <TextInput
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Name"
                keyboardType="default"
                onChangeText={text => setWine(text)}
                value={wine}
            />
            <Text>Winery:</Text>
            <TextInput
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Winery"
                keyboardType="default"
                onChangeText={text => setWinery(text)}
                value={winery}
            />
            <Text>Country:</Text>
            <TextInput
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Country"
                keyboardType="default"
                onChangeText={text => setCountry(text)}
                value={country}
            />
            <Text>Latitude:</Text>
            <TextInput
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Latitude"
                keyboardType="default"
                onChangeText={text => setLatitude(Number(text))}
                value={String(latitude)}
            />
            <Text>Longitude:</Text>
            <TextInput
                secureTextEntry={false}
                autoCapitalize="words"
                placeholder="Longitude"
                keyboardType="default"
                onChangeText={text => setLongitude(Number(text))}
                value={String(longitude)}
            />
            <Button title="Upload" onPress={PickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Submit" onPress={Submit}/>
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
      width: 200,
      height: 200,
    },
  });


export default NewWineForm;