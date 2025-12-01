
import {Row, Container, Col} from 'react-bootstrap'
import { Link } from 'react-router-dom'
const RegisterPage = () => {
    return (
    <div style={{minHeight:"470px"}}>
        <Container className="mt-4 d-flex justify-content-center text-center" >
        <form className="form-register" >
        <Row>
        <Col sm="12" className="mb-3 d-flex flex-column">
        <label className=" label-mail mt-3 mx-4" >First Name</label>
        <div className=" mt-3 d-flex justify-content-center" >
          <input className="email" type="text" placeholder="First Name" />
        </div>
        </Col>
        <Col sm="12" className="mb-3 d-flex flex-column">
        <label className=" label-mail mt-3 mx-4" >Last Name</label>
        <div className=" mt-3 d-flex justify-content-center" >
          <input className="email" type="text" placeholder="Last Name" />
        </div>
        </Col>

        <Col sm="12" className="mb-3 d-flex flex-column">
        <label className=" label-mail mt-3 mx-4" >Email address</label>
        <div className=" mt-3 d-flex justify-content-center" >
          <input className="email" type="email" placeholder="Enter email" />
        </div>
        </Col>
        <Col sm="12">
        <label className="label-mail mt-3 mx-4">Password</label>
        <div className="mt-3 d-flex justify-content-center" controlId="formBasicPassword">
          <input className="email" type="password" placeholder="Password" />
        </div>
        </Col>
        <Col sm="12" className="mt-3 d-flex justify-content-center">
        <button className="bnt-form " type="submit">Sign In</button>
        </Col>
        </Row>
        </form>
      </Container >
      <p className="text-center mt-4 haveaccount">You have an account?
      <Link to="/Login" className="signin">LogIn</Link>
      </p>
    </div>
    )
}

export default RegisterPage

