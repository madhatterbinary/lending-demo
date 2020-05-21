import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='text-center col'>
          <ClipLoader
            sizeUnit='px'
            size={ 40 }
            color='#E83D52'
            loading
          />
        </div>
      </div>
    </div>
  );
};

export default Spinner;
