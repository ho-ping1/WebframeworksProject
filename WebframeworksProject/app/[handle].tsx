import { Stack, useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { View, Text } from "react-native";
import { DataContext } from "../components/DataProvider";

const WineProfile = () => {
    const { wines } = useContext(DataContext);
    const { handle } = useLocalSearchParams<{ handle: string}>();
    const wine = wines.find(wine => wine.wine == handle);

    return (
        <View>
            <Stack.Screen options={{title: handle}}/>
            <Text><Text>{wine!.location.replace("\n·\n", ", ")}</Text></Text>
        </View>
    )
}

export default WineProfile;