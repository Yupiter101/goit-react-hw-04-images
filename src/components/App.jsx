import {useState, useEffect, useRef} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadButton } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { getApi } from "services/pixabayApi";
import { perPage } from "services/pixabayApi";



export function App() {

  const [searchName, setSearchName] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);


  const isFirstRenderApp = useRef(true);
  useEffect(()=> {
    if(isFirstRenderApp.current) {
      isFirstRenderApp.current = false;
      console.log('Пропуск 1');
      return
    }
    if(!searchName) {
      console.log('Пропуск 2');
      return
    }
    getGaleryApi(searchName, page);
  }, [searchName, page]);


  function handleSubmit(search) {
    if(search !== searchName) {
      setSearchName(search);
      setImages([]);
      setPage(1);
      setLoading(false);
    }
    else {
      console.log('То це вже ж було !!!!');
      toast('То це вже ж було !!!!');
    }
  }


  const handleLoadMore = () => setPage(c => c + 1);

  async function getGaleryApi(searchName, page) {
    setLoading(true);
    try {
        const images = await getApi(searchName, page);

        if(!images.hits.length) {
            console.log("Sorry, there are no images matching your search query. Please try again.");
            toast('Sorry, there are no images');
            // Notify.warning('orry, there are no images matching your search query. Please try again.');
            return
        }

        setImages(c => ([...c, ...images.hits]));
        setIsLoadMore(page < Math.ceil(images.totalHits / perPage));
    }
    catch(error) {
        console.error(error.message);
        setErrorApi(true);
    }
    finally {
      setLoading(false);
    }
  }
 


    if(errorApi) {
      return <h1 style={{marginLeft: '40%'}}>Ой! Щось трапилось ...</h1>
    }
    
    return (
      <div>
        <SearchBar onSubmit={handleSubmit}></SearchBar>
        <ImageGallery items={images}></ImageGallery>
        {isLoadMore && <LoadButton onLoadMore={handleLoadMore}></LoadButton>}
        {loading && <Loader></Loader>}
        <ToastContainer autoClose={3000}></ToastContainer>
      </div>
    );

  
};

