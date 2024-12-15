import { Drawer } from "expo-router/drawer";
import { Tabs, Navigator } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const Layout = () => {
    return (
        <Tabs
            screenOptions= {{
                headerTintColor: "white",
                headerStyle: {backgroundColor: "#8E041A"}
            }}
        >
                <Tabs.Screen name="index" options={{
                    title: "Home",
                    tabBarIcon: ({color, size}) => <MaterialIcons name="home" size={24} color="white" />,
                    tabBarStyle: {backgroundColor:"#8E041A"},
                    tabBarActiveTintColor: "yellow",
                    tabBarInactiveTintColor: "white",
                }}/>
                <Tabs.Screen name="collection" options={{
                    title: "Collection",
                    tabBarIcon: ({color, size}) => <Ionicons name="wine-outline" size={24} color="white" />,
                    tabBarStyle: {backgroundColor:"#8E041A"},
                    tabBarActiveTintColor: "yellow",
                    tabBarInactiveTintColor: "white"
                }}/>
                <Tabs.Screen name="newWine" options={{
                    title: "New Wine",
                    tabBarIcon: ({color, size}) => <Ionicons name="add" size={24} color="white" />,
                    tabBarStyle: {backgroundColor:"#8E041A"},
                    tabBarActiveTintColor: "yellow",
                    tabBarInactiveTintColor: "white"
                }}/>
        </Tabs>
    );
}

export default Layout;