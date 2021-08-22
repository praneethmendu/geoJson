import React from 'react';
import { shallow } from 'enzyme';
import JsonDilogComponent from './JsonDilogComponent';

describe('<JsonDilogComponent />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<JsonDilogComponent />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
