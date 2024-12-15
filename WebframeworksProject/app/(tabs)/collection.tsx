import {Wine, Rating, Coordinates} from '../../types';
import { StyleSheet, Text, View } from 'react-native';
import WineCollection from '../../components/WineCollection';
import { ScrollView } from 'react-native-gesture-handler';

const Collection = () => {
    return (
        <View style={{flex: 1}}>
            <WineCollection/>
        </View>
    )
}

export default Collection;