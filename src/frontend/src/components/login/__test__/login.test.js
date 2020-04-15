import React from 'react'
import { shallow } from 'enzyme'
import { Login } from '../login'

/* eslint-disable */
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn()
  })
}))

describe('create reminder modal', () => {
  it('should render login correctly', () => {
    const wrapper = shallow(<Login />)
    expect(wrapper).toMatchSnapshot()
  })
})
