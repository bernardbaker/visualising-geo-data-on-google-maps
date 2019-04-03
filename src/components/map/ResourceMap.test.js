import React from 'react';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import GoogleApiWrapper from './ResourceMap';

describe('ResourceMap', () => {
    let wrapper;
    beforeEach(() => wrapper = shallow(<GoogleApiWrapper />))

    it('should render correctly', () => expect(wrapper).toMatchSnapshot());
})