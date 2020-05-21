import React, { Fragment, useState, useEffect } from 'react';
import * as actions from 'js/Store/Actions/application';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { Link } from 'react-router-dom';
import SummaryIcon from 'js/assets/svgs/summary.svg';
import ManagementIcon from 'js/assets/svgs/manage.svg';
import { reduxForm } from 'redux-form';
import ProductForm from './ProductForm.jsx';

const FormWrapped = reduxForm({
  form: 'form-screen',
  enableReinitialize: true,
  initialValues: {
    prod_name: 'FRS1',
  },
})(ProductForm);

function MainMenuScreen() {
  const { resetSession } = useActions(actions);
  const [initMenu, setInitMenu] = useState(true);
  const [productName, setProductName] = useState('FRS1');

  useEffect(() => {
  }, [initMenu, productName]);

  const deleteCookie = (name) => {
    document.cookie = `${ name }=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  // TODO - don't do this here, we should do this when the page loads or something
  const menuItemHandler = (item) => {
    localStorage.removeItem('journeyType');
    // eslint-disable-next-line no-restricted-globals
    deleteCookie('auth0.ssodata');
    if (item.target.name === 'lending') {
      resetSession();
    }
    localStorage.setItem('journeyType', item.target.name);
    setInitMenu(false);
  };

  return (
    <Fragment>
      {initMenu
        ? (
          <div className='min-vh-100 d-flex align-items-center'>
            <div className='container'>
              <div className='row col-md mb-5 mt-5'>
                <div className='col text-center'>
                  <h1>Your financial options</h1>
                </div>
              </div>
              <div className='row col-md text-center'>
                <div className='col text-center'>
                  <img src={ SummaryIcon } alt='summary icon' className='svg-icons' />
                  <h2>Your loan</h2>
                  <p>Manage your loans online</p>
                  <Link to='/lending/getaloan'>
                    <button
                      className='btn btn-raised btn-primary'
                      type='button'
                      name='lending'
                      data-cy='action-choose-loan'
                      onClick={ (item) => menuItemHandler(item) }
                    >
                      Apply for a loan
                    </button>
                  </Link>
                </div>
                <div className='home-menu-item'>
                  <Fragment>
                    <img src={ ManagementIcon } alt='management icon' className='svg-icons' />
                    <h2 className='bold'>Your savings</h2>
                    <p>Manage your savings online</p>
                    <FormWrapped
                      setProductName={ (value) => setProductName(value) }
                    />
                    <Link to={ `/savings/?product_code=${ productName }` }>
                      <button
                        className='btn btn-raised btn-primary'
                        style={{ margin: 0 }}
                        type='button'
                        name='savings'
                        onClick={ (item) => menuItemHandler(item) }
                        data-cy='action-choose-savings'
                      >
                        Apply for savings account
                      </button>
                    </Link>
                  </Fragment>
                </div>
              </div>
            </div>
          </div>
        ) : null
      }
    </Fragment>
  );
}

export default MainMenuScreen;
