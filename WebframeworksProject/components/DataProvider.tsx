import { Wine } from '../types';
import React, { createContext, useEffect, useState } from 'react';

export interface DataContext {
    wines: Wine[];
    setWines: React.Dispatch<React.SetStateAction<Wine[]>>;
    loadWines: () => void;
}

export const DataContext = createContext<DataContext>({wines: [], setWines: () => {}, loadWines: () => {}});

const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [wines, setWines] = useState<Wine[]>([]);
    const loadWines = async() => {
        try {    
            const headers = { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczNDEyODI3MX0.kzFZQlmcjOabTfOIa7-mX8CZsumOa6nCPKTG6E61wmY' };
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
        loadWines()
    }, []);

    return (
        <DataContext.Provider value={{wines: wines, setWines, loadWines}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;