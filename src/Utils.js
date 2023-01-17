const url = (query, page) =>
  `https://pixabay.com/api/?q=${query}&page=${page}&key=30908520-61e3e7767732b591b87412aca&image_type=photo&orientation=horizontal&per_page=15`;

export function fetchHandler(query, page, app) {
  fetch(url(query, page))
    .then(response => {
      if (!response.ok) {
        throw new Error('bad request');
      }
      return response.json();
    })
    .then(data => {
      const dataImages = data.hits.map(({ id, webformatURL, tags }) => {
        return { id, webformatURL, tags };
      });
      if (page === 1) {
        app.setImages(dataImages);
      } else {
        app.setImages(images => [...images, ...dataImages]);
      }
    })
    .catch(console.log)
    .finally(() => {
      app.setIsLoading(false);
      app.setIsLoadMoreShowing(true);
    });
}
