import React from 'react'
import { Navbar, Container, Nav, Form, Button ,NavDropdown} from 'react-bootstrap'
import logo from'../../images/logo.png'
import login from'../../images/login.png'
import cart from'../../images/cart.png'
const NavBar = () => {
    return (
        <div>
        <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
        <Container fluid >
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
          <Nav className="mx-5">
          <Nav.Link href='/Login'
              className="nav-text d-flex mt-3 justify-content-center">
              <img src={login} className="login-img" alt="sfvs" />
              <p style={{ color: "white" }}>Login</p>
          </Nav.Link>
          <Nav.Link href='/cart'
              className="nav-text d-flex mt-3 justify-content-center"
              style={{ color: "white" }}>
              <img src={cart} className="login-img" alt="sfvs" />
              <p style={{ color: "white" }}>Cart</p>
          </Nav.Link>
      </Nav>
      <div className="d-flex justify-content-center">
            <Form className="search mt-2">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 w-100 text-center "
                aria-label="Search"
              />
            </Form>
            <a href='/'>
            <img src={logo} className="logo mx-5" alt="sfvs" />
            </a>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </div>
    )
}

export default NavBar;
