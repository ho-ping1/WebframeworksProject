import { Wine } from '../types';
import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from './DataProvider';
import { useRouter } from "expo-router";

interface WineProps {
    wine: Wine
}

const WineItem = ({ wine }: WineProps) => {
    const router = useRouter();
    const { recent, setRecent, postRecent } = useContext(DataContext);

    return (
        <View >
            <Pressable onPress={() => 
                {router.push("/" + wine.wine);
                    if (recent.length <= 10) {
                        setRecent(recent.slice(0, -1));
                        setRecent(prevRecent => [wine.wine, ...prevRecent]);
                    } else {
                        setRecent(prevRecent => [wine.wine, ...prevRecent]);
                    }    
                }}
                style={styles.wineContainer}
            >
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
                    <Text>{wine.location ? wine.location.replace("\n·\n", ", ") : ""}</Text>               
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
        height: '100%',
        paddingLeft: 40
    },
    wineDetail: {
        width: '70%',
        height: '100%'
    }
})

const WineCollection = () => {
    const { wines, setWines } = useContext(DataContext);
    const [refreshing, setRefreshing] = useState(false);

    const refreshList = async() => {
        setRefreshing(true);
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
            onEndReachedThreshold={0.5}
        />
    );
}

export default WineCollection;