import { Breed, BreedListResponse } from '../models/breed';
import ImageListResponse from '../models/image-list-response';

export default class DogStore {

    getBreedList = async () => {
        try {
            const resJson = await window.fetch("http://localhost:5000/dog/breeds");
            const res: BreedListResponse = await resJson.json();
            return res.breeds;
        } catch (error) {
            return Promise.reject(error);
        }
    }

    getImages = async (breed: string, subbreed?: string) => {
        let requestUrl;
        if (subbreed && subbreed.length > 0) {
            requestUrl = `http://localhost:5000/dog/images?breed=${breed}&subbreed=${subbreed}`;
        } else {
            requestUrl = `http://localhost:5000/dog/images?breed=${breed}`
        }

        try {
            const resJson = await window.fetch(requestUrl);
            const res: ImageListResponse = await resJson.json();
            return res.images;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}