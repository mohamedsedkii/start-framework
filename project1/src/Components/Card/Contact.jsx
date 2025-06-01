import React, { useState } from 'react';

export default function Contact() {
  const [userName, setUserName] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  return (
    <div className="pt-4 mt-5 mb-2">
      <div className="pt-5 text-center contact">
        <h1 className='fw-bold'>CONTACT SECTION</h1>
        <span><i className="fa-solid fa-star"></i></span>
      </div>

      <div className="d-flex justify-content-center align-items-center flex-column pt-5 w-100">

        
        <div className="mb-4 text-black w-50">
          {userName && (
            <div className="text-success mb-1 fw-bold fs-6 text-start">
              userName
            </div>
          )}
          <div className="form-floating">
            <input
              type="text"
              className="form-control form"
              id="userName"
              placeholder="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor="userName">userName</label>
          </div>
        </div>

        
        <div className="mb-4 text-black w-50">
          {userAge && (
            <div className="text-success mb-1 fw-bold fs-6 text-start">
              userAge
            </div>
          )}
          <div className="form-floating">
            <input
              type="number"
              className="form-control form"
              id="userAge"
              placeholder="userAge"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
            />
            <label htmlFor="userAge">userAge</label>
          </div>
        </div>

        
        <div className="mb-4 text-black w-50">
          {userEmail && (
            <div className="text-success mb-1 fw-bold fs-6 text-start">
              userEmail
            </div>
          )}
          <div className="form-floating">
            <input
              type="email"
              className="form-control form"
              id="userEmail"
              placeholder="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <label htmlFor="userEmail">userEmail</label>
          </div>
        </div>

        
        <div className="mb-4 text-black w-50">
          {userPassword && (
            <div className="text-success mb-1 fw-bold fs-6 text-start">
              userPassword
            </div>
          )}
          <div className="form-floating">
            <input
              type="password"
              className="form-control form"
              id="userPassword"
              placeholder="userPassword"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <label htmlFor="userPassword">userPassword</label>
          </div>
        </div>

        <button type="button" className="btn btn-success mt-3 myBtn">Send Message</button>
      </div>
    </div>
  );
}
