import React from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";






const modalRoot = document.querySelector('#modal-root');
export class Modal extends React.Component {


  componentDidMount() {
    window.addEventListener('keydown', this.handleModalEsc);
    console.log('keydown');
  }


  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleModalEsc);
  }


  handleModalEsc = (event) => {
    if(event.code === "Escape") {
      console.log("Escape");
      this.props.closeModal();
    } 
  }

  handleBackdropClick = (event)  => {
    if(event.target === event.currentTarget) {
      console.log('BackdropClick');
      this.props.closeModal();
    }
  }


  render() {

    const {largeImg} = this.props;

    return createPortal(
      <div className={css.ModalBackdrop} onClick={this.handleBackdropClick}>
        <div className={css.ModalContent}>
          <img src={largeImg} alt="thing" />
        </div>
      </div>, modalRoot
    )
  }
}


Modal.propType = {
  largeImg: PropTypes.string.isRequired,
}


