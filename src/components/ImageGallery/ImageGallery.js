import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Modal } from 'components/Modal/Modal';





export function ImageGallery({ items }) {

  const [showModal, setShowModal] = React.useState(false);
  const [largeImage, setLargeImage] = React.useState('');


  const openModal = (largeImage) => {
    setShowModal(true);
    setLargeImage(largeImage);
    
  }

  const closeModal = () => {
    setShowModal(false);
    
  }

    return (
      <>
        <ul className={css.ImageGallery}>
          {items.map(({id, webformatURL, largeImageURL}) => (
                <ImageGalleryItem key={id} 
                  image={webformatURL} 
                  largeImage={largeImageURL}
                  openModal={openModal}
                ></ImageGalleryItem>))}
        </ul>

        {showModal && <Modal closeModal={closeModal} largeImg={largeImage}></Modal>}
        
      </>
    );
  
}


ImageGallery.propType = {
  items:PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired, 
    }).isRequired,
  ).isRequired,
}






