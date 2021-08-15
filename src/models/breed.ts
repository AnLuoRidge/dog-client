export type Breed = {
    breed: string,
    subbreed: string[]
}

export type BreedListResponse = {
    breeds: Breed[];
}
