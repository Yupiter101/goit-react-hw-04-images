import {useEffect, useRef} from "react";
import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { createPortal } from "react-dom";



const modalRoot = document.querySelector('#modal-root');
export function Modal({largeImg, closeModal}) {

  const handleBackdropClick = (event)  => {
    if(event.target === event.currentTarget) {
      console.log('BackdropClick');
      closeModal();
    }
  }


  const handleModalEsc = (event) => {
    if(event.code === "Escape") {
      console.log("Escape");
      closeModal();
    } 
  }


  const isFirstRender = useRef(true);

  useEffect(()=> {
    if(isFirstRender.current) {
      isFirstRender.current = false;
      return
    }
   
    window.addEventListener('keydown', handleModalEsc);
    console.log('add keydown');

    return ()=> {
      window.removeEventListener('keydown', handleModalEsc);
      console.log('remove keydown');
    }
  }, []);


  // useEffect(()=> {
  //   if(isFirstRender.current) {
  //     isFirstRender.current = false;
  //     return
  //   }
  //   const handleModalEsc = (event) => {
  //     if(event.code === "Escape") {
  //       console.log("Escape");
  //       closeModal();
  //     } 
  //   }
  //   window.addEventListener('keydown', handleModalEsc);
  //   console.log('add keydown');

  //   return ()=> {
  //     window.removeEventListener('keydown', handleModalEsc);
  //     console.log('remove keydown');
  //   }
  // }, [closeModal]);



    return createPortal(
      <div className={css.ModalBackdrop} onClick={handleBackdropClick}>
        <div className={css.ModalContent}>
          <img src={largeImg} alt="thing" />
        </div>
      </div>, modalRoot
    )
  
}


Modal.propType = {
  largeImg: PropTypes.string.isRequired,
}



