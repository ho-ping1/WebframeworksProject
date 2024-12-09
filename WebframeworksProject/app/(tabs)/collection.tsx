import {Wine, Rating, Coordinates} from '../../types';
import { StyleSheet, Text, View } from 'react-native';
import WineCollection from '../../components/WineCollection';

const Collection = () => {
    return (
        <View>
            <WineCollection/>
        </View>
    )
}

export default Collection;