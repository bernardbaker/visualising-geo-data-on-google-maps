import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import App from './App';
import GoogleApiWrapper from '../map/ResourceMap'

describe('App', () => {

  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('should render correctly', () => expect(wrapper).toMatchSnapshot());

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the resource map component', () => {
    expect(wrapper.containsMatchingElement(<GoogleApiWrapper />)).toEqual(true)
  })

});
