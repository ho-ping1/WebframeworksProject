import { Wine } from '../types';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { useContext, useState } from 'react';
import DataProvider, { DataContext } from './DataProvider';
import { useRouter } from "expo-router";

interface WineProps {
    wine: Wine
}

const WineItem = ({ wine }: WineProps) => {
    const router = useRouter();

    return (
        <View >
            <Pressable onPress={() => {router.push("/" + wine.wine)}} style={styles.wineContainer}>
                <View style={styles.imageContainer}>
                    <Image 
                        resizeMode="contain" 
                        style={{width: 40, height: 150}}
                        source={{uri: wine.image}}
                    />
                </View>
                <View style={styles.wineDetail}>
                <View>
                    <Text style={{paddingBottom: 2}}>{wine.winery}</Text>
                    <Text style={{fontWeight: 'bold'}}>{wine.wine}</Text>    
                    <Text>{wine.location.replace("\n·\n", ", ")}</Text>               
                </View>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    wineContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'space-between',
        margin: 5,
        padding: 5
    },
    imageContainer: {
        width: '30%',
        height: '100%'
    },
    wineDetail: {
        width: '70%',
        height: '100%'
    }
})

const WineCollection = () => {
    let { wines, setWines } = useContext(DataContext);
    const [refreshing, setRefreshing] = useState(false);

    const refreshList = async() => {
        setRefreshing(true);
        // wait 2 seconds to simulate API call (or whatever)
        await new Promise((resolve, reject) => setTimeout(resolve, 2000));
        setWines(wines);
        setRefreshing(false);
    }

    return (
        <FlatList
            data={wines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={() => refreshList()}
        />
    );
}

export default WineCollection;