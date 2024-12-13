import { Wine } from '../types';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { useContext } from 'react';
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
    let { wines } = useContext(DataContext);
    return (
        <FlatList
            data={wines}
            renderItem={({ item }) => <WineItem wine={item}/>}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
        />
    );
}

export default WineCollection;