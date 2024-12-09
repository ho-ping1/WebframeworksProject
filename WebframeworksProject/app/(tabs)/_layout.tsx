import { Drawer } from "expo-router/drawer";
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs
            screenOptions= {{
                headerTintColor: "white",
                headerStyle: {backgroundColor: "red"}
            }}
        >
            <Tabs.Screen name="index" options={{title: "Home"}}/>
            <Tabs.Screen name="collection" options={{title: "Collection"}}/>
            <Tabs.Screen name="newWine" options={{title: "New Wine"}}/>
        </Tabs>
    );
}

export default Layout;