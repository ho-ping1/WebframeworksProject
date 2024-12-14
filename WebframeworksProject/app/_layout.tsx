import { Stack } from "expo-router";
import DataProvider, { DataContext } from '../components/DataProvider';

const layout = () => {
    return (
        <DataProvider>
            <Stack
                screenOptions= {{
                headerTintColor: "white",
                headerStyle: {backgroundColor: "#8E041A"}
                }}
            >
                <Stack.Screen name="(tabs)" options={{title: "", headerShown: false}}/>
            </Stack>
        </DataProvider>
    );
}

export default layout;