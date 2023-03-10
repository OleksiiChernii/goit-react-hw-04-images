import { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { fetchHandler } from 'Utils';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMoreShowing, setIsLoadMoreShowing] = useState(false);

  useEffect(() => {
    fetchHandler(query, page, {
      setImages,
      setIsLoading,
      setIsLoadMoreShowing,
    });
  }, [query, page]); 

  const searchHandler = query => {
    setImages([]);
    setIsLoading(true);
    setQuery(query);
    setPage(1);
    setIsLoadMoreShowing(false);
  };

  const buttonHandler = () => {
    setIsLoadMoreShowing(false);
    setIsLoading(true);
    setPage(page + 1);
  };

  return (
    <>
      <Searchbar onSubmit={searchHandler} />
      <ImageGallery images={images} />
      <Loader visible={isLoading} />
      {isLoadMoreShowing && <Button buttonHandler={buttonHandler} />}
    </>
  );
};
