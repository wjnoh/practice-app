import React, { FC, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import ImageCard from './components/ImageCard';

interface IImage {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

const App: FC = () => {
  const [count, setCount] = useState(0);
  const [Images, setImages] = useState<IImage[]>([]);

  useEffect(() => {
    window.addEventListener('scroll', scrollListener(setCount));

    return () => {
      window.removeEventListener('scroll', scrollListener(setCount));
    }
  }, [])

  useEffect(() => {
    const fetchImages = (async () => {
      const res = (await axios(`https://jsonplaceholder.typicode.com/photos?_start=${count * 5}&_limit=5`)).data as IImage[];
      setImages((prev) => prev.concat(res));
    })

    fetchImages();
  }, [count]);

  return (
    <div className="App">
      {Images && Images.map((d: IImage) => <ImageCard key={d.id} src={d.url} alt={d.title} />)}
    </div>
  );
}

const scrollListener = (setCount: React.Dispatch<React.SetStateAction<number>>) => debounce(() => {
  if (document.documentElement.scrollTop + document.documentElement.clientHeight + 500 >= document.documentElement.scrollHeight) {
    setCount((prev) => prev + 1);
  }
}, 200)

export default App;
