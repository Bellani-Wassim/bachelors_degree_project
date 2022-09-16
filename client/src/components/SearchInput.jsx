import React from 'react';
import searchImage from "../assets/images/search.svg";

function SearchInput({ searchParams, ...props }) {
  return (
    <div className='searchInput'>
      <img src={searchImage} alt='' />

      <input 
        placeholder={`Rechercher par ${searchParams.join(', ')} ...`}
        {...props}/>
    </div>
  );
}

export default SearchInput;
