
import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends React.Component {




  render() {
    const {image, largeImage, openModal} = this.props;
  
    return (
      <li className={css.ImageGalleryItem} onClick={()=> openModal(largeImage)}>
        <img className={css.ImageGalleryItemImage} src={image} alt="cat" />
      </li>
    );
  }
  
}


ImageGalleryItem.propType = {
  image: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired, 
}

