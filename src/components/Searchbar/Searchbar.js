import React from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';


export function SearchBar({onSubmit}) {


  const handleSubmit = event => {
    event.preventDefault();
    const searchName = event.currentTarget.elements.searchName.value;
    if(searchName.trim() === '') {
      console.log('Напиши що-небудь!');
      toast('Напиши що-небудь!');
    }
    else {
      onSubmit(searchName);
      event.currentTarget.reset();
    }
   
  };


    return (
      <header className={css.Searchbar}>
  
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <FaSearch className={css.Icon} ></FaSearch> 
          </button>
  
          <input
            className={css.SearchFormInput}
            type="text"
            name="searchName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
  
      </header>
    );
  
}



