import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Login.scss';
import { toast } from 'react-toastify';
import { loginApi } from '../services/userServices';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingAPI, setloadingAPI] = useState(false);


  useEffect( () =>{
    let token = localStorage.getItem("token");
    if(!token){
      navigate("/login");
    }
  }, [navigate]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, such as sending data to a server
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleLogin = async () => {
    if(!email || !password){
      toast.error("Email,password is required !")
      return;
    }
    setloadingAPI(true);
    let res = await loginApi(email,password);
    if(res && res.token){
      localStorage.setItem("token", res.token);
      navigate("/");
    } else{
      //error
      if(res && res.status === 400){
        toast.error(res.data.error);
      }
    }
  }

  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Login (eve.holt@reqres.in)</h2>
      <Form.Group controlId="formBasicEmail" className="form-group">
        <Form.Label className="form-label">Email address</Form.Label>
        <Form.Control className="form-control" type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword" className="form-group">
        <Form.Label className="form-label">Password</Form.Label>
        <Form.Control className="form-control" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
      </Form.Group>
        <Button 
        className={email && password ? "active" : ""}
        disabled={email && password ? false : true}
        variant="primary" 
        type="submit"
        onClick={() => handleLogin()}
        >
        Submit
        </Button>
        <Form.Text className="go-back">
        <i className="fa-solid fa-angles-left"></i>   Go back
        </Form.Text>
    </Form>
  );
};

export default Login;
