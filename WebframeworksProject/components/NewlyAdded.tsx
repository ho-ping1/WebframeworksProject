import { useContext, useEffect, useState } from "react";
import { Text, View, FlatList, Pressable, StyleSheet, Image } from "react-native";
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
                <Image source={{uri: wine.image}}/>
                <Text>{wine.wine} !  </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 200
    }
})

const NewlyAdded = () => {
    const { wines } = useContext(DataContext);
    const [newWines, setNewWines] = useState<Wine[]>([]);
    const currentDate: Date = new Date(); 

    async function getNewWines() {
        const filteredWines = wines.slice(0, 10).filter((wine) => {
            return ((Math.floor(currentDate.getTime() / 60000) - Math.floor(wine.date?.getTime()! / 60000)) <= 43829)
        });
        if (filteredWines != undefined) {
            setNewWines(filteredWines);
        }       
    }

    useEffect(() => {
        getNewWines()
    }, [wines]);
    
    return (
        <FlatList 
            horizontal={true}
            data={newWines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}          
        />
    )
}

export default NewlyAdded;