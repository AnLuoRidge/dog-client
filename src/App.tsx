import React, { useState, useEffect } from 'react';
import './App.css';
import { Breed } from './models/breed';
import DogStore from './stores/dog-store';

function App() {
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [breedOptions, setBreedOptions] = useState<string[]>([]);
  const [breedSelected, setBreedSelected] = useState<string>('');
  const [subbreedOptions, setSubbreedOptions] = useState<string[]>([]);
  const [subbreedSelected, setSubbreedSelected] = useState<string>('');
  const [dogImages, setDogImages] = useState<string[]>([]);
  const dogStore = new DogStore();

  useEffect(() => {
    dogStore.getBreedList()
      .then((res) => {
        if (res) {
          setAllBreeds(res);
          const breedNames = res.map((b: Breed) => b.breed)
          setBreedOptions(breedNames);
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBreedSelect = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueSelected = e.target.value as string
    setBreedSelected(valueSelected);
    setSubbreedSelected('');
    dogStore.getImages(valueSelected).then(res => {
      if (res) {
        setDogImages(res);
      } else {
        console.error('Failed to load images');
      }
    })

    const breed: Breed | undefined = allBreeds.find((b) => b.breed === valueSelected)
    if (breed && breed.subbreeds.length > 0) {
      setSubbreedOptions(breed.subbreeds);
    } else {
      setSubbreedOptions([]);
    }
  })

  const onSubbreedSelect = ((e: React.ChangeEvent<HTMLSelectElement>) => {
    const valueSelected = e.target.value as string
    setSubbreedSelected(valueSelected);
    dogStore.getImages(breedSelected, valueSelected).then(res => {
      if (res) {
        setDogImages(res);
      } else {
        console.error('Failed to load images');
      }
    })
  })

  return (
    <div className="app">
      <div className="drop-downs">
      {breedOptions.length > 0 && <select
        id="breed-select"
        name="breed-select"
        value={breedSelected}
        onChange={onBreedSelect}
      >
        <option disabled value=''> -- select a breed -- </option>
        {breedOptions.map(breedName => (<option key={breedName} value={breedName}>{breedName}</option>))}
      </select>}
      {subbreedOptions.length > 0 && <select
        id="subbreed-select"
        name="subbreed-select"
        value={subbreedSelected}
        onChange={onSubbreedSelect}
      >
        <option disabled value=''> -- select a subbreed -- </option>
        {subbreedOptions.map(subbreedName => (<option key={subbreedName} value={subbreedName}>{subbreedName}</option>))}
      </select>}
      </div>
      <div className='image-grid'>
        {dogImages.map((url, index) => (<img key={url} src={url} height='200rem' alt={`dog-${index}`} />))}
      </div>
    </div>
  );
}

export default App;
