/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as appActions from 'js/Store/Actions/application';
import * as actions from 'js/Store/Actions/generic';
import { useActions } from 'js/Components/Hooks/useActions.jsx';
import { push } from 'connected-react-router';
import { useStore } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import uuid from 'uuid';
import './Dropdown.scss';

const Dropdown = (props) => {
  const { initial, options } = props;
  const [selected, setSelected] = useState(initial || -1);
  const [active, setActive] = useState(false);
  const store = useStore();
  const { resetSession } = useActions(appActions);
  const { appWarningsErrors } = useActions(actions);

  useEffect(() => {
    setSelected(Number(localStorage.getItem('index')));
  }, [selected]);

  const activateDropdown = () => {
    setActive(true);
  };


  const handleClick = (option, i) => {
    appWarningsErrors(null, null, false);
    localStorage.setItem('MenuOption', option);
    localStorage.setItem('index', i);
    localStorage.setItem('loanActionType', option);
    setActive(!active);
    if (option === 'Inbox') {
      store.dispatch(push(`/${ localStorage.getItem('journeyType') }/servicing/inbox`));
    } else if (option === 'Preferences' || option === 'Password reset' || option === 'Account') {
      store.dispatch(push(`/${ localStorage.getItem('journeyType') }/servicing/myaccount`));
    } else if (option === 'Logout') {
      resetSession();
    } else if (option === 'Overview') {
      store.dispatch(push(`/${ localStorage.getItem('journeyType') }/servicing/overview`));
    }
    setSelected(Number(localStorage.getItem('index')));
  };
  const handleFocus = () => {};

  const renderOptions = () => {
    if (!options) {
      return;
    }
    return options.map((option, i) => {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li
          onClick={ () => handleClick(option, i) }
          key={ uuid.v4() }
          className={ `dropdown__list-item ${ i === selected ? 'dropdown__list-item--active' : '' }` }
        >
          {option}
        </li>
      );
    });
  };

  const { title } = props;

  Dropdown.handleClickOutside = () => setActive(false);

  return (
    <div className='dropdown'>
      <div
        onMouseOver={ () => activateDropdown() }
        onFocus={ () => handleFocus() }
        className={ `dropdown__toggle dropdown__list-item top' ${ active ? 'dropdown__toggle dropdown__list-item top--active' : '' }` }
      >
        { title }
      </div>
      <ul className={ `dropdown__list ${ active ? 'dropdown__list--active' : '' }` }>{ renderOptions() }</ul>
    </div>
  );
};

Dropdown.propTypes = {
  title: PropTypes.object,
  options: PropTypes.array,
  initial: PropTypes.any,
};

Dropdown.defaultProps = {
  title: {},
  options: [],
  initial: null,
};

const clickOutsideConfig = {
  handleClickOutside: () => Dropdown.handleClickOutside,
};

export default onClickOutside(Dropdown, clickOutsideConfig);
