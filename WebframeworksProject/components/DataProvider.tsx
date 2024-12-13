import { Wine } from '../types';
import React, { createContext, useEffect, useState } from 'react';

export interface DataContext {
    wines: Wine[];
    setRefresh: React.Dispatch<React.SetStateAction<Number>>
}

export const DataContext = createContext<DataContext>({wines: [], setRefresh: () => {}});

const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [wines, setWines] = useState<Wine[]>([]);
    const [refresh, setRefresh] = useState<Number>(0);
    const loadWines = async() => {
        try {    
            const headers = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InMxNTMyNDdAYXAuYmUiLCJpYXQiOjE3MzQwMTY1MDR9.KOT48cnZaHBxBgn1lwBcA7dp-2pBX26RNmY6ez3fJYE' };
            const baseURL = "https://sampleapis.assimilate.be/wines/reds/";
            let response = await fetch(baseURL, {headers});
            if (!response.ok){
                throw new Error(`Failed to fetch ${response.status}, ${response.statusText}`)
            }
            let wines: Wine[] = await response.json();
            wines.shift();
            setWines(wines);
            
        } catch (error) {
            console.log("Error", error)
        }
    };
  
    useEffect(() => {
      loadWines()
    }, []);

    useEffect(() => {
        loadWines()
    }, [refresh]);

    return (
        <DataContext.Provider value={{wines: wines, setRefresh}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;