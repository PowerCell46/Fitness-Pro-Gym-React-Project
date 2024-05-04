const { assert } = require('chai');
const fetchMock = require('fetch-mock');
const { describe, it, before, after } = require('mocha');
const React = require('react');
const { render, waitFor } = require('@testing-library/react');
const { Trainers } = require('./Trainers');


describe('Trainers Component', () => {
  before(() => {
    fetchMock.get('http://localhost:5000/trainers', {
      status: 200,
      body: [
        {
          photo: 'base64-encoded-image-data',
          name: 'John Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
        },
      ],
    });
  });

  after(() => {
    fetchMock.restore();
  });

 
  it('renders the component without errors', async () => {
    const { container } = render(<Trainers />);
    await waitFor(() => assert.isNotNull(container));
  });

 
  it('fetches trainers data and renders it', async () => {
    const { getByText, getByAltText } = render(<Trainers />);
    await waitFor(() => assert.isNotNull(getByAltText('John Doe')));

    assert.isNotNull(getByText('Name: John Doe'));
    assert.isNotNull(getByText('Email: john.doe@example.com'));
    assert.isNotNull(getByText('Telephone: +1234567890'));
  });

 
  it('handles error response from the server', async () => {
    fetchMock.get('http://localhost:5000/trainers', {
      status: 500,
      body: { error: 'Internal Server Error' },
    });
  
    const { getByText } = render(<Trainers />);
    await waitFor(() => assert.isNotNull(getByText('Internal Server Error')));
  });
  

  it('navigates to /404 if the fetch request fails', async () => {
    fetchMock.get('http://localhost:5000/trainers', {
      status: 404,
      body: { error: 'Not Found' },
    });
  
    const { navigate } = useContext(GlobalContext); 
    const { getByText } = render(
      <GlobalContext.Provider value={{ navigate }}>
        <Trainers />
      </GlobalContext.Provider>
    );
  
    await waitFor(() => assert.isNotNull(getByText('Not Found')));
    assert.isTrue(navigate.calledWith('/404'));
  });
  
 
  it('displays trainers with correct image alt text', async () => {
    const { getByAltText } = render(<Trainers />);
    await waitFor(() => assert.isNotNull(getByAltText('John Doe')));
  });
  
});
