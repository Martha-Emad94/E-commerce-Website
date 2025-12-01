import { Navbar, Container, Nav, Form } from 'react-bootstrap';
import logo from '../../../images/logo.png';
import login from '../../../images/login.png';
import cart from '../../../images/cart.png';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar className="sticky-top" bg="dark" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center w-100">
            <a href="/" className="mb-2 mb-sm-0">
              <img src={logo} className="logo" alt="logo" />
            </a>

            <Form className="search mb-2 mb-sm-0 w-75 w-sm-50">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 text-center"
                aria-label="Search"
              />
            </Form>

            <Nav className="d-flex flex-row">
              <Nav.Link href="/Login" className="nav-text d-flex align-items-center">
                <img src={login} className="login-img me-1" alt="login" />
                <span>Login</span>
              </Nav.Link>
              <Nav.Link href="/cart" className="nav-text d-flex align-items-center">
                <img src={cart} className="login-img me-1" alt="cart" />
                <span>Cart</span>
              </Nav.Link>
            </Nav>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
