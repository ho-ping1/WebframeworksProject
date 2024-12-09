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
    const [rating, setRating] = useState(roundHalf(wine.rating.average));

    return (
        <View style={styles.container}>
            <Pressable onPress={() => {router.push("/" + wine.wine)}}>
                <View style={styles.imageContainer}>
                    <Image 
                        style={{width: 40,height: 160}}
                        source={{uri: wine.image}}
                    />
                </View>
                <Text>{wine.wine}</Text>
                <Text>{wine.winery}</Text>
                <View pointerEvents="none" style={{width: 100, flexDirection: "row"}}>
                    <Text style={styles.rating}>{wine.rating.average}</Text> 
                    <StarRating 
                            rating={rating}
                            onChange={setRating}
                            color="red"
                            starSize={20}
                            starStyle={{paddingLeft: 5, paddingRight: 5}}
                            style={{width: 5, justifyContent: "center"}}
                        />
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 170,
        height: 270,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 10
    },
    imageContainer: {
        paddingBottom: 5,
        alignItems: "center"
    },
    rating: {
        fontSize: 20
    }
})

const HighlyRated = () => {
    const { wines } = useContext(DataContext);
    const [featuredWines, setFeaturedWines] = useState<Wine[]>([]);

    async function getFeatured() {
        let filteredWines = wines.slice(0, 10).sort((a, b) => Number(b.rating.average) - Number(a.rating.average));
        setFeaturedWines(filteredWines);
    }

    useEffect(() => {
        getFeatured()
    }, [wines]);

    return (
        <FlatList 
            horizontal={true}
            data={featuredWines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}           
        />
    )
}

export default HighlyRated;