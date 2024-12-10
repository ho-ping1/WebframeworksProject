import {Wine, Rating, Coordinates} from '../../types';
import { StyleSheet, Text, View } from 'react-native';
import WineCollection from '../../components/WineCollection';
import NewWineForm from '../../components/NewWineForm';

const newWine = () => {
    return (
        <View>
            <NewWineForm/>
        </View>
    )
}

export default newWine;