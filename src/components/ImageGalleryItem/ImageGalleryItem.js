
import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';



export function ImageGalleryItem({image, largeImage, openModal}) {

    return (
      <li className={css.ImageGalleryItem} onClick={()=> openModal(largeImage)}>
        <img className={css.ImageGalleryItemImage} src={image} alt="cat" />
      </li>
    );
  
}


ImageGalleryItem.propType = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired, 
}


