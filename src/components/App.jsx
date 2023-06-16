import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { toast } from 'react-toastify';
import { SearchBar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadButton } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { getApi } from "services/pixabayApi";
import { perPage } from "services/pixabayApi";



export class App extends React.Component {

  state = {
    searchName: '',
    images: [],
    page: 1,
    loading: false,
    errorApi: false,  
    isLoadMore: false,
  };



  componentDidUpdate(prevProps, prevState) {
    const {searchName, page} = this.state;
    if (searchName !== prevState.searchName || page !== prevState.page) {
      this.getGaleryApi(searchName, page);
    }
  }


  handleSubmit = (searchName) => {
    if(searchName !== this.state.searchName) {
      this.setState({
        searchName: searchName,
        images: [],
        page: 1,
        isLoadMore: false,
      });
    }
    else {
      console.log('То це вже ж було !!!!');
      toast('То це вже ж було !!!!');
    }
  }


  handleLoadMore = () => {
    this.setState(prevState => ({page: prevState.page + 1 }));
    // console.log('handleLoadMore');
  }


  getGaleryApi = async (searchName, page) => {
    this.setState({loading: true})
    try {
        const images = await getApi(searchName, page);
        console.log('total', images.totalHits);

        if(!images.hits.length) {
            console.log("Sorry, there are no images matching your search query. Please try again.");
            toast('Sorry, there are no images');
            // Notify.warning('orry, there are no images matching your search query. Please try again.');
            
            return
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          isLoadMore: this.state.page < Math.ceil(images.totalHits / perPage),
        }));
    }
    catch(error) {
        console.error(error.message);
        this.setState({ errorApi: true })
    }
    finally {
      this.setState({loading: false})
    }
  }
 




  render() {
    const {loading, isLoadMore, errorApi} = this.state

    if(errorApi) {
      return <h1 style={{marginLeft: '40%'}}>Ой! Щось трапилось :(</h1>
    }
    
    return (
      <div>
        <SearchBar onSubmit={this.handleSubmit}></SearchBar>
        <ImageGallery items={this.state.images}></ImageGallery>
        {isLoadMore && <LoadButton onLoadMore={this.handleLoadMore}></LoadButton>}
        {loading && <Loader></Loader>}
        <ToastContainer autoClose={3000}></ToastContainer>
      </div>
    );
  }
  
};
