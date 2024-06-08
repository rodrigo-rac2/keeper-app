import { render, screen } from '@testing-library/react'
import App from '../App'
import { expect } from 'vitest'

describe('App', () => {
  it('should see the text "Keeper App" in the DOM', () => {
    render(<App />)
    expect(screen.getByText('Keeper App')).toBeInTheDocument()
  })
})