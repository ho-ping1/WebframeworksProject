import { Wine } from '../types';
import React, { createContext, useEffect, useState, useCallback } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';

export interface DataContext {
    wines: Wine[];
    setWines: React.Dispatch<React.SetStateAction<Wine[]>>;
    loadWines: () => void;
    recent: string[];
    setRecent: React.Dispatch<React.SetStateAction<string[]>>;
    postRecent: () => void;
    appIsReady: Boolean;
}

export const DataContext = createContext<DataContext>({
    wines: [], 
    setWines: () => {}, 
    loadWines: () => {}, 
    recent: [], 
    setRecent: () => {},
    postRecent: () => {},
    appIsReady: false
});



const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [wines, setWines] = useState<Wine[]>([]);
    const [recent, setRecent] = useState<string[]>([]);
    const [appIsReady, setAppIsReady] = useState(false);

    const getRecent = async() => {
        const arr = await AsyncStorage.getItem('recentlyVisited');
        if (arr !== null) {
            setRecent(JSON.parse(arr));
        }
    }
    const postRecent = async() => {
        await AsyncStorage.setItem('recentlyVisited', JSON.stringify(recent));
    }

    const loadWines = async() => {
        try {  
            AsyncStorage.clear();
            const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNTMyNEBhcC5iZSIsImlhdCI6MTczNDI3Nzk0NX0.pLImlOlUePIcXI_tq7wOYwRRd-qHiQDi9xNldtvJvtY' };
            const baseURL = "https://sampleapis.assimilate.be/wines/reds";
            let response = await fetch(baseURL, {headers});
            if (!response.ok){
                throw new Error(`Failed to fetch ${response.status}, ${response.statusText}`)
            }
            let wines: Wine[] = await response.json();
            getRecent();
            setWines(wines);       
        } catch (error) {
            console.log("Error", error)
        } finally {
            setAppIsReady(true);
        }
    };
    
    useEffect(() => {
        loadWines();
    },);

    return (
        <DataContext.Provider value={{wines: wines, setWines, loadWines, recent, setRecent, postRecent, appIsReady}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;