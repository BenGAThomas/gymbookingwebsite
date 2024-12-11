// import React from 'react'

const Signup = () => {
  return (
    <div>
      <div className="signupContainer">
        <h2>Sign Up</h2>
        <form className="signupForm">
            <label htmlFor="username">Username:</label>
            <input type="text" placeholder="Username"/>

            <label htmlFor="email">Email:</label>
            <input type="email" autoComplete="off" placeholder='Email'/> 

            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='*******'/> 
            <button type='submit'>Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
