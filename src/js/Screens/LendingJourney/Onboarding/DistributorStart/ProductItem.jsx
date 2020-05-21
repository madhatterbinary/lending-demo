/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const ProductItem = ({ active, onClick, product, index }) => {
  return (
    <div onClick={ onClick } className={ active ? 'prod active' : 'prod' }>
      <nav
        className='primary-color-stripe odd-stripe'
        style={{ marginBottom: 0, marginTop: 0, padding: 0, color: 'transparent' }}
      >
        <div
          className='primary-color-stripe-content stripe-container'
          style={{ paddingBottom: 20 }}
        >
          <article style={{
            borderTop: '1px solid #b4b4b4',
            borderLeft: '1px solid #b4b4b4',
            width: 540,
            paddingLeft: 50,
            paddingRight: 50,
          }}
          >
            <h4 className='grey table' style={{ fontSize: '1.3em' }}>Amount</h4>
            <h1
              className='title grey table'
              style={{
                top: 0,
                fontSize: '1.3em',
              }}
            >{`£${ product.initial_amount }`}</h1>
          </article>

          <article style={{
            borderTop: '1px solid #b4b4b4',
            borderLeft: '1px solid #b4b4b4',
            width: 540,
            paddingLeft: 50,
            paddingRight: 50,
          }}
          >
            <h4 className='grey table' style={{ fontSize: '1.3em' }}>Your real
              rate</h4>
            <h1
              className='title grey table'
              style={{
                top: 0,
                fontSize: '1.3em',
              }}
            >{`${ Number(product.apr) }%`}</h1>
          </article>

          <article style={{
            borderTop: '1px solid #b4b4b4',
            borderLeft: '1px solid #b4b4b4',
            borderBottom: '1px solid #b4b4b4',
            width: 540,
            paddingLeft: 50,
            paddingRight: 50,
          }}
          >
            <h4 className='grey table' style={{ fontSize: '1.3em' }}>Monthly
              payments ({product.term})</h4>
            <h1
              className='title grey table'
              style={{
                top: 0,
                fontSize: '1.3em',
              }}
            >{`£${ product.monthly_payments }`}</h1>
          </article>
        </div>
        <article className='middle-container'>
          <h4 className='white'>Total amount payable</h4>
          <h1
            className='title white'
            style={{ fontSize: '2.3em' }}
          >{`£${ product.total_amount } `}</h1>
          <button
            className='btn btn-primary'
            style={{ marginBottom: 20, marginTop: 20 }}
            type='button'
            id={ index }
            onClick={ onClick }
          >
            select
          </button>
        </article>
      </nav>
    </div>
  );
};

ProductItem.propTypes = {
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
ProductItem.defaultProps = {
  active: false,
  onClick: () => {},
};

export default ProductItem;
