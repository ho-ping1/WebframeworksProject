import { Wine } from '../types';
import { View, Text, FlatList, Pressable } from 'react-native';
import { useContext } from 'react';
import DataProvider, { DataContext } from './DataProvider';
import { useRouter } from "expo-router";

interface WineProps {
    wine: Wine
}

const WineItem = ({ wine }: WineProps) => {
    const router = useRouter();

    return (
        <View>
            <Pressable onPress={() => {router.push("/" + wine.wine)}}>
                <Text>{wine.wine}</Text>
            </Pressable>
        </View>
    )
}

const WineCollection = () => {
    const { wines } = useContext(DataContext);
    return (
        <FlatList
            data={wines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}

export default WineCollection;