import { Breed, BreedListResponse } from '../models/breed';

export default class BreedStore {
    breeds: Breed[];
    constructor() {
        this.breeds = [];
      }

    getBreedList: () => Promise<Breed[] | undefined> = async () => {
        try {
            const resJson = await window.fetch("http://localhost:5000/dog/breeds");
            const res: BreedListResponse = await resJson.json();
            this.breeds = res.breeds;
            return res.breeds;
        } catch (error) {
            
        }
    } 
}