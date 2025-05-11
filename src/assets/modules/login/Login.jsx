import React, { useState } from 'react';
import './Login.css';
import { toast } from 'react-toastify';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  function formatDateGMT() {
    const now = new Date();

    const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
    const day = now.getDate();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()];
    const year = now.getFullYear();
    const hours = now.getUTCHours();
    const minutes = now.getUTCMinutes();
    const seconds = now.getUTCSeconds();

    // Ensure leading zeros for single-digit values
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedDate = `${dayOfWeek}, ${day} ${month} ${year} ${formattedHours}:${formattedMinutes}:${formattedSeconds} GMT`;
    console.log('Formatted date:', formattedDate);
    return formattedDate;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    return;
    const endpoint = "https://script.google.com/macros/s/AKfycby2sRNEClyo0IFwNi7XRi9Xk2FUknE8e3fXs1UOD1Oz6_hYiyX_Z7JzNHh_8PMW3A/exec";

    try {
      const formData = new URLSearchParams(); 
      formData.append('Name', username);
      formData.append('Password', password);
      formData.append('LastLogin', formatDateGMT());

      console.log('Form data:', formData.toString());
      const response = await fetch(endpoint, {
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
      } else {
        toast.error(data.message || 'Login failed. Please try again.');
        console.error('Login failed:', data);
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred. Please try again.');
      console.error('Error:', error);
    }
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
          <button type="submit" className="login-button">Submit</button>
          <a href='/registration' className="anchor">Register</a>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
