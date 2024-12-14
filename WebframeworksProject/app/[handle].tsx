import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DataContext } from "../components/DataProvider";
import MapView, {Region, Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { Wine } from "../types";
import CountryFlag from "react-native-country-flag";

const WineProfile = () => {
    const { wines, setWines} = useContext(DataContext);
    const { handle } = useLocalSearchParams<{ handle: string}>();
    const wine = wines.find(wine => wine.wine == handle);
    const [rating, setRating] = useState(Number(wine!.rating.average));
    const [reviews, setReviews] = useState(Number(wine!.rating.reviews.replace(/[^0-9]/g, '')))
    

    function roundHalf(num: number) {
        return Math.round(num * 2)/2;
    }

    const Rate = async (number: number) => {
        const amountReviews: number = Number(wine!.rating.reviews.replace(/[^0-9]/g, ''));
        const postData: Wine = {
            winery: wine!.winery,
            wine: wine!.wine,
            rating: {
                average: String(roundHalf((Number(wine!.rating.average) + number) / 2)),
                reviews: `${amountReviews + 1} ratings`,
            },
            location: wine!.location,
            coordinates: {
                latitude: wine!.coordinates.latitude,
                longitude: wine!.coordinates.longitude,
            },
            image: wine!.image,
            id: wine!.id
        };
        
        const baseURL = `https://sampleapis.assimilate.be/wines/reds/${wine!.id}`;
            const response = await fetch(baseURL, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczNDEwNDQ2Nn0.wcI2zdCMXeYagwEOwszuqA0rBwTmzzKrQgsarEGwn3A',  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log('Response from server:', data);
        setRating(roundHalf((Number(wine!.rating.average) + number) / 2));
        setReviews(amountReviews + 1);
    }
    useEffect(() => {
         const loadWines = async() => {
            try {    
                const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            await delay(3000);
                const baseURL = "https://sampleapis.assimilate.be/wines/reds";
                let response = await fetch(baseURL, {
                    method: 'GET', 
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczNDE3OTI1Mn0.yg7or_yACESMbF93I-UwbBelwFh_C2MQCzUEFkVtT_Y'
                    }
                });
                if (!response.ok){
                   throw new Error(`Failed to fetch ${response.status}, ${response.statusText}`)
                }
                const wineData: Wine[] = await response.json();
                setWines(wineData);    
            } catch (error) {
                console.log("Error", error)
            }
        };     
        loadWines();
    }, [reviews]);
    
    return (
        <View style={{padding: 10}}>
            <Stack.Screen options={{title: "Wine Profile"}}/>
            <View style={{paddingBottom: 30}}>
                <View style={styles.wineImageRatingContainer}>
                    <View style={styles.wineImageContainer}>
                        <Image
                            resizeMode="contain" 
                            style={{width: 100, height: 200, }}
                            source={{uri: wine!.image}}
                        />
                    </View>
                    <View style={styles.wineRatingContainer}>
                        <Text style={{fontSize: 35}}>{rating}</Text>
                        <StarRating 
                            rating={roundHalf(rating)}
                            onChange={Rate}
                            color="#8E041A"
                            starSize={22}
                        />
                        <Text style={{fontSize: 15}}>{reviews} ratings</Text>
                    </View>
                </View>
                <Text style={{fontSize: 18, paddingBottom: 5}}>{wine!.winery}</Text>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{wine!.wine}</Text>
                <Text style={{fontSize: 15}}><CountryFlag isoCode="de" size={12} /> {wine!.location.replace("\n·\n", "\n")}</Text>
            </View>           
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: wine!.coordinates.latitude,
                    longitude: wine!.coordinates.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0921,
                }}
            >
                <Marker
                    key={wine!.wine}
                    coordinate={{
                        latitude: wine!.coordinates.latitude,
                        longitude: wine!.coordinates.longitude
                    }}
                    title={wine!.winery}
                />  
            </MapView>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wineImageRatingContainer: {
        width: "100%",
        flexDirection: "row",
        paddingBottom: 15
    },
    wineImageContainer: {
        width: "50%",
        alignItems: "center"
    },
    wineRatingContainer: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center"
    },
    map: {
      width: '100%',
      height: 400,
    },
  });

export default WineProfile;