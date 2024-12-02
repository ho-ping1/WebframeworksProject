/* eslint-disable no-irregular-whitespace */
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './components/Root/Root'
import HomePage from './components/HomePage/HomePage'
import WineCollectionPage from './components/WineCollectionPage/WineCollectionPage'
import RecommendationPage from './components/RecommendationPage/RecommendationPage'
import {Wine, Rating, Coordinates} from './types'
import { useEffect, useState } from 'react'
import './App.css'

// auth header with bearer token
const headers = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvLXBpbmcua2V1bmdAc3R1ZGVudC5hcC5iZSIsImlhdCI6MTczMzE2NDA0Mn0.OFTLYPhlwtmBhQXt_qNNQpOkfOgOdh2duO9vu-eRXCU'};
const baseURL = "https://sampleapis.assimilate.be/wines/reds/";

const App = () => {

  const [wines, setWines] = useState<Wine[]>([]);

  const loadWines = async() => {
    const response = await fetch(baseURL, {headers});
    const wineJson: Wine[] = await response.json();
    
    setWines(wineJson.map(wine => {
      return wine;
    }));
  }

  useEffect(() => {
    setWines([])
    loadWines();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "",
          element: <HomePage/>
        },
        {
          path: "collection",
          element: <WineCollectionPage/>
        },
        {
          path: "recommendation",
          element: <RecommendationPage/>
        }
      ]
    }
  ]);

  console.log(wines);

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App
