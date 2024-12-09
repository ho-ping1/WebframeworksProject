import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, Pressable } from "react-native";
import { DataContext } from "./DataProvider";
import { Wine } from "../types";
import { useRouter } from "expo-router";

interface WineProps {
    wine: Wine
}

const WineItem = ({ wine }: WineProps) => {
    const router = useRouter();

    return (
        <View>
            <Pressable onPress={() => {router.push("/" + wine.wine)}}>
                <Text>{wine.wine} !  </Text>
            </Pressable>
        </View>
    )
}

const Trending = () => {
    const { wines } = useContext(DataContext);
    const [trendingWines, setTrendingWines] = useState<Wine[]>([]);

    async function getFeatured() {
        const filteredWines = wines.slice(0, 10).sort((a, b) => Number(b.rating.reviews.replace(/[^0-9]/g, '')) - Number(a.rating.reviews.replace(/[^0-9]/g, '')));
        setTrendingWines(filteredWines);
    }

    useEffect(() => {
        getFeatured()
    }, [wines]);
    
    return (
        <FlatList 
            horizontal={true}
            data={trendingWines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}          
        />
    )
}

export default Trending;