import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { DataContext } from "../components/DataProvider";
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating-widget';
import { Wine } from "../types";
import CountryFlag from "react-native-country-flag";

const WineProfile = () => {
    const { wines, loadWines} = useContext(DataContext);
    const { handle } = useLocalSearchParams<{ handle: string}>();
    const wine = wines.find(wine => wine.wine == handle);
    const [rating, setRating] = useState(Number(wine!.rating.average));
    const [reviews, setReviews] = useState(Number(wine!.rating.reviews.replace(/[^0-9]/g, '')));
    const countries: string[] = ["Spain", "Italy", "Portugal", "United States", "France", "Argentina", "South Africa", "Hungary"];
    const countriesIso: string[] = ["es", "it", "pt", "us", "fr", "ar", "za", "hu"];

    function roundHalf(num: number) {
        return Math.round(num * 2)/2;
    }

    function findIso (country: string) {
        const indexCountry: number = countries.findIndex(name => name.toLowerCase() == country.toLowerCase())
        if (indexCountry) {
            return countriesIso[indexCountry];
        } else {
            return null;
        }
    }

    function getStringBeforeChar(str: string, char: string): string {
        console.log(str)
        return str.split(char)[0];
    }

    const Rate = async (number: number) => {
        const amountReviews: number = Number(wine!.rating.reviews.replace(/[^0-9]/g, ''));
        const postData: Wine = {
            winery: wine!.winery,
            wine: wine!.wine,
            rating: {
                average: String(rating),
                reviews: `${reviews} ratings`,
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
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNTMyNEBhcC5iZSIsImlhdCI6MTczNDI2NzExMX0.jECsJIsf6JZ44x6DRxQljMQFxKHS0lIajyaY9cG2CFQ',  
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const data = await response.json();
        console.log('Response from server:', data);
        if (reviews != 0) {
            setRating((prevRating) => roundHalf((prevRating + number) / 2));
        } else {
            setRating((prevRating) => roundHalf((prevRating + number)));
        }         
        setReviews((prevReviews) => prevReviews + 1);
    }
    useEffect(() => {    
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
                        <Text style={{fontSize: 15, color: "grey"}}>{reviews} ratings</Text>
                    </View>
                </View>
                <Text style={{fontSize: 18, paddingBottom: 5}}>{wine!.winery}</Text>
                <Text style={{fontSize: 20, fontWeight: "bold"}}>{wine!.wine}</Text>
                {wine?.location ? 
                    <Text style={{fontSize: 15}}>
                        { findIso(getStringBeforeChar(wine.location, '\n')) ? <CountryFlag isoCode={findIso(getStringBeforeChar(wine.location, '\n'))!} size={12} />
                        : ""} {wine!.location.replace("\n·\n", "\n")}
                    </Text> 
                : ""}
            </View>
            { wine?.coordinates.latitude ?           
            <MapView 
                style={styles.map}
                initialRegion={{
                    latitude: wine!.coordinates.latitude!,
                    longitude: wine!.coordinates.longitude!,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0921,
                }}
            >
                <Marker
                    key={wine!.wine}
                    coordinate={{
                        latitude: wine!.coordinates.latitude!,
                        longitude: wine!.coordinates.longitude!
                    }}
                    title={wine!.winery}
                />  
            </MapView> :
            <Text>No map location</Text> }
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