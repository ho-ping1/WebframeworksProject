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