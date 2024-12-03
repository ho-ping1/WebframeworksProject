export interface Wine {
    winery: string,
    wine: string,
    rating: Rating,
    location: string,
    coordinates: Coordinates,
    image: string,
    id: number
};

export interface Rating {
    average: number,
    reviews: string
};

export interface Coordinates {
    latitude: string,
    longitude: string
}