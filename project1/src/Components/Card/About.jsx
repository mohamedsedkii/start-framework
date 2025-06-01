import React from 'react'

export default function About() {
  return (
     <div className="about min-vh-100 text-white pt-5 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex justify-content-center align-items-center">
      <h1>ABOUT COMPONENT</h1>
      </div>
       <div className='star'>
       <span><i class="fa-solid fa-star"></i></span>

      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 pt-4">
            <p>
              Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.
            </p>
            </div>
            <div className="col-md-6 pt-4">
               <p>
                Freelancer is a free bootstrap theme created by Route. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.
              </p>
            </div>
          
        </div>
      </div>
    </div>
  )
}
