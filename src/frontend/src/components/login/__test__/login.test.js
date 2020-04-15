import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../login'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

/* eslint-disable */
describe('create reminder modal', () => {
  it('should render login correctly', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})
