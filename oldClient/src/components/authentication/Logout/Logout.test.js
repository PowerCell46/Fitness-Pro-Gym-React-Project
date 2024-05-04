const { assert } = require('chai');
const { describe, it } = require('mocha');
const React = require('react');
const { render, fireEvent, waitFor } = require('@testing-library/react');
const { Logout } = require('./Logout.jsx'); 

describe('Logout Component', () => {

  it('renders the component without errors', async () => {
    const { container } = render(<Logout />);
    await waitFor(() => assert.isNotNull(container));
  });

  
  it('calls logoutSubmitHandler and sets logout component to false when "Logout" button is clicked', async () => {
    const logoutSubmitHandlerMock = jest.fn();
    const { getByText } = render(
      <Logout logoutSubmitHandler={logoutSubmitHandlerMock} />
    );

    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    await waitFor(() => {
      assert.isTrue(logoutSubmitHandlerMock.calledOnce);
    });
  });

 
  it('sets logout component to false when "Cancel" button is clicked', async () => {
    const setLogoutComponentMock = jest.fn();
    const { getByText } = render(
      <Logout setLogoutComponent={setLogoutComponentMock} />
    );

    const cancelButton = getByText('Cancel');
    fireEvent.click(cancelButton);

    await waitFor(() => {
      assert.isTrue(setLogoutComponentMock.calledOnceWith(false));
    });
  });

});
