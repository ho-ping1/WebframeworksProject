import { Wine } from '../types';
import { View, Text, FlatList } from 'react-native';
import { useContext } from 'react';
import DataProvider, { DataContext } from './DataProvider';

interface WineProps {
    wine: Wine
}

const WineItem = ({ wine }: WineProps) => {
    return (
        <View>
            <Text>{wine.wine}</Text>
        </View>
    )
}

const WineCollection = () => {
    const { wines } = useContext(DataContext);
    console.log(wines);
    return (
        <FlatList
            data={wines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}
            />
    );
}

export default WineCollection;