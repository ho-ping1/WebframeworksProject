import { Wine } from '../types';
import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface DataContext {
    wines: Wine[];
    setWines: React.Dispatch<React.SetStateAction<Wine[]>>;
    loadWines: () => void;
    recent: string[];
    setRecent: React.Dispatch<React.SetStateAction<string[]>>;
    postRecent: () => void;
}

export const DataContext = createContext<DataContext>({
    wines: [], 
    setWines: () => {}, 
    loadWines: () => {}, 
    recent: [], 
    setRecent: () => {},
    postRecent: () => {}
});

const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [wines, setWines] = useState<Wine[]>([]);
    const [recent, setRecent] = useState<string[]>([]);
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
            const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczNDE3OTI1Mn0.yg7or_yACESMbF93I-UwbBelwFh_C2MQCzUEFkVtT_Y' };
            const baseURL = "https://sampleapis.assimilate.be/wines/reds";
            let response = await fetch(baseURL, {headers});
            if (!response.ok){
                throw new Error(`Failed to fetch ${response.status}, ${response.statusText}`)
            }
            let wines: Wine[] = await response.json();
            setWines(wines);
            
        } catch (error) {
            console.log("Error", error)
        }
    };
  
    useEffect(() => {
        loadWines();
        getRecent();
    }, []);

    return (
        <DataContext.Provider value={{wines: wines, setWines, loadWines, recent, setRecent, postRecent}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;