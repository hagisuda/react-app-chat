import React from 'react'

export default function Login() {
  return (
    <div className="formContainer">
        <div className="formWrapper">
            <span className="logo">Haky Chat</span>
            <h1 className="title">Login</h1>
            <form action="">
                <input type="email" placeholder="Enter your email" />
                <input type="password" placeholder="Enter your password" />
                <button type="submit">Login</button>
            </form>
            <p className="comment">You don't have an account?<a href="./login" className="link">Sign Up</a></p>
        </div>
    </div>
  )
}
