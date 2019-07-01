import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { cleanup } from '@testing-library/react';
import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';
import App from './App';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test('App changes the text after click', () => {
  // Render a formPrice with label in the document
  const formPrice = shallow(<App />);

  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('Please input number');

  // for change value
  // formPrice.find('#inputPrice').simulate('change', { target: { value: '18.215' } });
  // expect(formPrice.find('#messageView').text()).toEqual('valid');

  formPrice.find('#inputPrice').simulate('change', { target: { value: '18.215' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('1 x Rp10000, 1 x Rp5000, 3 x Rp1000, 2 x Rp100, left Rp15 (no available fraction)');

  formPrice.find('#inputPrice').simulate('change', { target: { value: 'Rp17500' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('1 x Rp10000, 1 x Rp5000, 2 x Rp1000, 1 x Rp500');

  formPrice.find('#inputPrice').simulate('change', { target: { value: 'Rp17.500,00' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('1 x Rp10000, 1 x Rp5000, 2 x Rp1000, 1 x Rp500');

  formPrice.find('#inputPrice').simulate('change', { target: { value: 'Rp 120.325' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('1 x Rp100000, 1 x Rp20000, 3 x Rp100, left Rp25 (no available fraction)');

  formPrice.find('#inputPrice').simulate('change', { target: { value: '005.000' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('1 x Rp5000');

  formPrice.find('#inputPrice').simulate('change', { target: { value: '001000' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('1 x Rp1000');

  formPrice.find('#inputPrice').simulate('change', { target: { value: '17,500' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('Only 00 after comma');

  formPrice.find('#inputPrice').simulate('change', { target: { value: '2 500' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('Please use proper separator (.)');

  formPrice.find('#inputPrice').simulate('change', { target: { value: '3000 Rp' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('Error Currency Symbol');

  formPrice.find('#inputPrice').simulate('change', { target: { value: 'Rp' } });
  formPrice.find('#formSubmit').simulate('submit', {
    preventDefault: () => {
    }
  });
  expect(formPrice.find('#messageView').text()).toEqual('Please input number');
});