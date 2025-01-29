export interface CreateFoodItem {
    name: string;
    description: string;
    category: string;
    foodType: Array<string> ;
    readyTime: number;
    price: number;
    rating: number
}