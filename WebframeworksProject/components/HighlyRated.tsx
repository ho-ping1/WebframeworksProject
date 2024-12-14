import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, Pressable, Image, StyleSheet } from "react-native";
import { DataContext } from "./DataProvider";
import { Wine } from "../types";
import { useRouter } from "expo-router";
import StarRating from 'react-native-star-rating-widget';

interface WineProps {
    wine: Wine
}

function roundHalf(num: number) {
    return Math.round(num * 2)/2;
}

const WineItem = ({ wine }: WineProps) => {
    const router = useRouter();
    const [rating, setRating] = useState(roundHalf(Number(wine.rating.average)));

    return (
        <View style={styles.wineContainer}>
            <Pressable onPress={() => {router.push("/" + wine.wine)}}>
                <View style={styles.imageContainer}>
                    <Image 
                        resizeMode="contain" 
                        style={{width: 40, height: 150}}
                        source={{uri: wine.image}}
                    />
                </View>
                <View style={styles.wineHeader}>
                    <Text style={{paddingBottom: 2}}>{wine.winery}</Text>
                    <Text style={{fontWeight: 'bold'}}>{wine.wine}</Text>                   
                </View>
                <View pointerEvents="none" style={{width: 100, flexDirection: "row", height: 20}}>
                    <Text style={styles.rating}>{wine.rating.average}</Text> 
                    <StarRating 
                        rating={roundHalf(Number(wine.rating.average))}
                        onChange={setRating}
                        color="#8E041A"
                        starSize={15}
                        starStyle={{paddingLeft: 2, paddingRight: 2}}
                        style={{width: 5, justifyContent: "center"}}
                    />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wineContainer: {
        width: 170,
        height: 290,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 10,
        paddingBottom: 30,
    },
    imageContainer: {
        height: 160,
        paddingBottom: 5,
        alignItems: "center"
    },
    wineHeader: {
        height: 80,
        paddingBottom: 20
    },
    rating: {
        fontSize: 15
    }
})

const HighlyRated = () => {
    const { wines } = useContext(DataContext);
    const [featuredWines, setFeaturedWines] = useState<Wine[]>([]);

    async function getFeatured() {
        const filteredWines = wines.slice(0, 10).sort((a, b) => Number(b.rating.average) - Number(a.rating.average));
        setFeaturedWines(filteredWines);
    }

    useEffect(() => {
        getFeatured()
    }, [wines]);

    return (
        <View>
            <Text style={{fontSize: 20, padding: 5}}>Top rated</Text>
            <FlatList 
                horizontal={true}
                data={featuredWines}
                renderItem={({ item }) => <WineItem wine={item}/>}
                keyExtractor={(item) => item.id.toString()}   
                showsHorizontalScrollIndicator={false}  
                style={{paddingBottom: 10}}
            />
        </View>
    )
}

export default HighlyRated;