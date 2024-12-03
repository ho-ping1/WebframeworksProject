import { Wine } from '../types';
import React, { createContext, useEffect, useState } from 'react';

export interface DataContext {
    wines: Wine[];
}

export const DataContext = createContext<DataContext>({wines: []});

const DataProvider = ({children}: {children: React.ReactNode}) => {
    const [wines, setWines] = useState<Wine[]>([]);

    const headers = { 'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvcGluZy5rZXVuZ0BzdHVkZW50LmFwLmJlIiwiaWF0IjoxNzMzMjQ3NDc2fQ.oQ4JCAGe3JS7VBgJPFQb1vBNE0HPoUhvmdu8ZqU5YmM' };
    const baseURL = "https://sampleapis.assimilate.be/wines/reds/";
    async function loadWines() {
      let response = await fetch(baseURL, {headers});
      let wines: Wine[] = await response.json();
      setWines(wines);
    };
  
    useEffect(() => {
      loadWines()
    }, []);

    return (
        <DataContext.Provider value={{wines: wines}}>
            {children}
        </DataContext.Provider>
    );
}

export default DataProvider;