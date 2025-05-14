import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from '../../script/config';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlashFill } from 'react-bootstrap-icons';
import { InputGroup, Form } from 'react-bootstrap';
import LoadingScreen from '../loadingScreen/LoadingScreen';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new URLSearchParams();
      formData.append('Action', "login");
      formData.append('Name', username);
      formData.append('Password', password);

      console.log('Form data:', formData.toString());
      const response = await fetch(config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(), // Convert to string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
  
        toast.success(data.message || 'Login successful!');
        console.log('Login successful:', data);
        setUsername('');
        setPassword('');
        navigate('/Home');
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
        console.error('Login failed:', data);
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
      {isLoading && <LoadingScreen message="Logging in..."/>} {/* LOADING SCREEN*/}
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group mb-2">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email Address *"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <InputGroup> {/* Wrap the input and the toggle icon */}
                    <Form.Control // Use Form.Control for better Bootstrap integration
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      placeholder="Password"
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
                <div className="form-group d-flex justify-content-between align-items-center">
                  <div className="form-check  mb-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="remember"
                      name="remember"
                    />
                    <label className="form-check-label" htmlFor="remember">
                      Remember me
                    </label>
                  </div>
                  <a href="/forget-password" className="text-muted">
                    Forgot your password?
                  </a>
                </div>
                <hr className="my-4" />
                <div className="d-flex justify-content-center gap-2">
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  <a href="#/registration" className="btn btn-outline-secondary">
                    Register
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;