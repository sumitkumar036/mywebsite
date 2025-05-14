import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import config from '../../script/config';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import { InputGroup, Form } from 'react-bootstrap'; 
import LoadingScreen from '../loadingScreen/LoadingScreen';


function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append('Action', "register");
      formData.append('Name', username);
      formData.append('Email', email);
      formData.append('Password', password);
      console.log('Form data:', formData.toString());
      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || 'Registration successful!');
        console.log('Registration successful:', data);

        localStorage.setItem('email', email);

        navigate('/login');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } 
      else 
      {
        toast.error(data.message || 'Registration failed. Please try again.');
        console.error('Registration failed:', data);
      }
    } 
    catch (error) 
    {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error:', error);
    }
    finally
    {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      {isLoading && <LoadingScreen message="Registering..."/>} {/* LOADING SCREEN*/}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card mt-5 bg-light">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username *"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Password *"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <InputGroup.Text
                      onClick={togglePasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    >
                      {showPassword ? <EyeSlashFill /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
                <div className="form-group mb-2">
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm Password *"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <InputGroup.Text
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ cursor: 'pointer' }}
                    >
                      {showConfirmPassword ? <EyeSlashFill /> : <Eye />}
                    </InputGroup.Text>
                  </InputGroup>
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Register
                </button>
                <div className="text-center mt-3">
                  <p>
                    Already have an account? <a href="#/login">Login</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;