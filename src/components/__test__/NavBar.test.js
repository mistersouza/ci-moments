import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import NavBar from '../NavBar'
import { UserProvider } from '../../Contexts/UserContext';

test('renders NavBar', () => {
    render(
        <Router>
            <NavBar />
        </Router>
    ); 
    // screen.debug(); 
    const signInLink = screen.getByRole('link', { name: 'Sign in' });
    expect(signInLink).toBeInTheDocument();
})

test('render link to the user profile for a logged in user', async () => {
    render(
        <Router>
            <UserProvider>
                <NavBar />
            </UserProvider>
        </Router>
    ); 
    
    const profileAvatar = await screen.findByText('Profile')
    expect(profileAvatar).toBeInTheDocument(); 
})

test('render Sign in and Sign up buttons on log out', async () => {
    render(
        <Router>
            <UserProvider>
                <NavBar />
            </UserProvider>
        </Router>
    ); 
    const signOutLink = await screen.findByRole('link', {name: 'Log out'})
    fireEvent.click(signOutLink)
    
    const singInLink = await screen.findByRole('link', {name: 'Sign in'});
    const singUpLink = await screen.findByRole('link', {name: 'Sign up'});
    
    expect(singInLink).toBeInTheDocument();
    expect(singUpLink).toBeInTheDocument(); 
})