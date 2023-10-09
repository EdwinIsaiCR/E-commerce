import React from 'react'
import './header.scss'
import Button from 'react-bootstrap/Button'
import { useAuthContext } from '@/Hooks/useAuthContext'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Header = () => {
  const { logout, isAuth } = useAuthContext()

  function vaciarLocal(){
    const anchura = (localStorage.length - 1)
    for (let index = 0; index <= anchura; index++) {
    (localStorage.removeItem(`Producto${index}`))
  }
  localStorage.removeItem("contador")
  }

  const linkIsActive = (isActive) =>
    isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'

  return (
    <Navbar className='header' bg='light' data-bs-theme='light'>
      <Container className='header'>
        <Navbar.Brand className='header__logo' href='/'>
          <img
            src='https://www.creativefabrica.com/wp-content/uploads/2020/02/10/Shop-Logo-Graphics-1-580x386.jpg'
            width='90'
            height='auto'
            alt='logo'
          />
          <p className='eslogan'>Shop from anyway, anytime</p>
        </Navbar.Brand>
        <Nav className='header__nav-list me-auto'>
          <Nav.Link className={({ isActive }) => linkIsActive(isActive)} href='/'>Home</Nav.Link>
          <Nav.Link className={({ isActive }) => linkIsActive(isActive)} href='/dashboard'>Dashboard</Nav.Link>

          {isAuth
            ? (
              <>
                <Nav.Link className={({ isActive }) => linkIsActive(isActive)} href='/Carrito'>Carrito</Nav.Link>
                <Button className='header__item-link' onClick={() => {
                  logout()
                  vaciarLocal()}
                  } variant='dark'><a className='logout' href='/login'>logout</a></Button>
              </>
              )
            : (
              <>
                <Nav.Link className={({ isActive }) => linkIsActive(isActive)} href='/login'>Login</Nav.Link>
                <Nav.Link className={({ isActive }) => linkIsActive(isActive)} href='/signup'>Signup</Nav.Link>
              </>
              )}
        </Nav>
      </Container>
    </Navbar>

  /* <nav className='header'>
      <NavLink className='header__logo' to='/'>Logo</NavLink>
      <ul className='header__nav-list'>
        <li className='header__nav-item'>
          <NavLink className={({ isActive }) => linkIsActive(isActive)} to='/'>Home</NavLink>
        </li>
        <li className='header__nav-item'>
          <NavLink className={({ isActive }) => linkIsActive(isActive)} to='/dashboard'>Dashboard</NavLink>
        </li>

        {isAuth
          ? (
            <>
              <li className='header__nav-item'>
                <NavLink className={({ isActive }) => linkIsActive(isActive)} to='/secret'>Secret</NavLink>
              </li>
              <li className='header__list-item'>
                <button className='header__item-link' onClick={logout}>Logout</button>
              </li>
            </>
            )
          : (
            <>
              <li className='header__nav-item'>
                <NavLink className={({ isActive }) => linkIsActive(isActive)} to='/login'>Login</NavLink>
              </li>
              <li className='header__nav-item'>
                <NavLink className={({ isActive }) => linkIsActive(isActive)} to='/signup'>Signup</NavLink>
              </li>
            </>
            )}

      </ul>
    </nav> */
  )
}

export default Header
