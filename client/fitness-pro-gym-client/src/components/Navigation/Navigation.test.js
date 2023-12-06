const { assert } = require('chai');
const { JSDOM } = require('jsdom');
const { describe, it } = require('mocha');
const React = require('react');
const { render } = require('@testing-library/react');
const { AuthenticationContext } = require('../../contexts/AuthenticationContext');
const { Navigation } = require('./Navigation.jsx'); 


describe('Navigation Component', () => {

  const contextValues = {
    user: null,
    setLogoutComponent: () => {},
    profilePhoto: '',
    numberOfCartProducts: 0,
    isAdministrator: false,
  };

  
  jest.spyOn(React, 'useContext').mockImplementation(() => contextValues);

  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
  global.document = dom.window.document;

  it('renders navigation links correctly when user is not logged in', () => {
    const { getByText } = render(
      <AuthenticationContext.Provider value={contextValues}>
        <Navigation />
      </AuthenticationContext.Provider>
    );

    assert.isNotNull(getByText('Register'));
    assert.isNotNull(getByText('Products'));
    assert.isNotNull(getByText('Highlights'));
    assert.isNotNull(getByText('Login'));
  });

 
  it('renders navigation links correctly when user is logged in', () => {
    const updatedContextValues = { ...contextValues, user: {} };

    const { getByText } = render(
      <AuthenticationContext.Provider value={updatedContextValues}>
        <Navigation />
      </AuthenticationContext.Provider>
    );

    assert.isNull(getByText('Register'));
    assert.isNotNull(getByText('Products'));
    assert.isNotNull(getByText('Highlights'));
    assert.isNull(getByText('Login'));
  });

 
  it('displays "Memberships" and "Trainers" links when the user is logged in', () => {
    const updatedContextValues = { ...contextValues, user: { } };
  
    const { getByText } = render(
      <AuthenticationContext.Provider value={updatedContextValues}>
        <Navigation />
      </AuthenticationContext.Provider>
    );
  
    assert.isNotNull(getByText('Memberships'));
    assert.isNotNull(getByText('Trainers'));
  });
  
 
  it('displays the profile dropdown when the user is logged in and clicks on the profile photo', () => {
    const updatedContextValues = { ...contextValues, user: { } };
  
    const { getByAltText, getByText } = render(
      <AuthenticationContext.Provider value={updatedContextValues}>
        <Navigation />
      </AuthenticationContext.Provider>
    );
  
    const profilePhoto = getByAltText('Profile Photo');
    fireEvent.click(profilePhoto);
  
    const hiddenProfileView = getByText('My Profile');
    assert.isNotNull(hiddenProfileView);
  });
  
 
  it('hides the profile dropdown when the user clicks on the profile photo again', () => {
    const updatedContextValues = { ...contextValues, user: { } };
  
    const { getByAltText, getByText, queryByText } = render(
      <AuthenticationContext.Provider value={updatedContextValues}>
        <Navigation />
      </AuthenticationContext.Provider>
    );
  
    const profilePhoto = getByAltText('Profile Photo');
    fireEvent.click(profilePhoto);
  
    assert.isNotNull(getByText('My Profile'));
  
    fireEvent.click(profilePhoto);
    
    assert.isNull(queryByText('My Profile'));
  });
  
});
