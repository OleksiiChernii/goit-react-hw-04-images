import { useState, useEffect, useMemo} from 'react';
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

  const imagesMemo = useMemo(() => images, [images]);

  useEffect(() => {
    fetchHandler(query, page, {
      imagesMemo,
      setImages,
      setIsLoading,
      setIsLoadMoreShowing,
    });
  }, [query, page]);

  const searchHandler = query => {
    const page = 1;
    setImages([]);
    setIsLoading(true);
    setQuery(query);
    setPage(page);
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
