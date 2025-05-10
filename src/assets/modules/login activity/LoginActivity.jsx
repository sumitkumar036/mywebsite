import React, { useState } from 'react';
import './LoginActivity.css';
import { toast } from 'react-toastify';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Logging in with:', { username, password });

    
    setTimeout(() => {
      toast.success('Login successful!');
    
    }, 1000);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username or Email Address *"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <div className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="/forget-password" className="forgot-password">Forgot your password?</a>
        </div>
        <br />
        <hr />
        <div className="button-group">
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="register-button">Register</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;