import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DataContext } from "../components/DataProvider";
import MapView from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { Wine } from "../types";

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
                const baseURL = "https://sampleapis.assimilate.be/wines/reds";
                let response = await fetch(baseURL, {
                    method: 'GET', 
                    headers: {
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczNDEyODI3MX0.kzFZQlmcjOabTfOIa7-mX8CZsumOa6nCPKTG6E61wmY'
                    }
                });
                if (!response.ok){
                   throw new Error(`Failed to fetch ${response.status}, ${response.statusText}`)
                }
                let wines: Wine[] = await response.json();
                setWines(wines);    
            } catch (error) {
                console.log("Error", error)
            }
        };
        loadWines();
    }, [reviews]);
    
    return (
        <View style={{padding: 10}}>
            <Stack.Screen options={{title: "Wine Profile"}}/>
            <View>
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
                <Text><Text>{wine!.location.replace("\n·\n", ", ")}</Text></Text>
            </View>
            
            <MapView style={styles.map} />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    wineImageRatingContainer: {
        width: "100%",
        flexDirection: "row"
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