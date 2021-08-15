export type Breed = {
    breed: string,
    subbreeds: string[]
}

export type BreedListResponse = {
    breeds: Breed[];
}
