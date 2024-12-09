import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const WineProfile = () => {
    const { handle } = useLocalSearchParams<{ handle: string}>();

    return (
        <View>
            <Stack.Screen options={{title: handle}}/>
            <Text>Individuel view for a wine object</Text>
        </View>
    )
}

export default WineProfile;