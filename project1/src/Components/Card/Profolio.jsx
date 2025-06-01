import React, { useState } from 'react';

export default function Portfolio() {
  const [lightBoxOpen, setLightBoxOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState('');

  const images = [
    'poert1.png',
    'port2.png',
    'port3.png',
    'poert1.png',
    'port2.png',
    'port3.png',
  ];

  const openLightBox = (imgName) => {
    const imgSrc = `https://routeegy.github.io/startFramework/assets/images/${imgName}`;
    setCurrentImg(imgSrc);
    setLightBoxOpen(true);
  };

  const closeLightBox = () => {
    setLightBoxOpen(false);
    setCurrentImg('');
  };

  return (
    <div className="pt-4 mt-5">
      <div className="pt-5 text-center prof">
        <h1>PORTFOLIO COMPONENT</h1>
        <span><i className="fa-solid fa-star" /></span>
      </div>

      <div className="container mb-4">
        <div className="row g-4">
          {images.map((img, i) => (
            <div className="col-md-4" key={i}>
              <div className="item position-relative" onClick={() => openLightBox(img)} style={{ cursor: 'pointer' }}>
                <img
                  src={`https://routeegy.github.io/startFramework/assets/images/${img}`}
                  className="w-100 rounded-3"
                  alt=""
                />
                <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}>
                  <span className="plus text-white fs-1">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LightBox */}
      {lightBoxOpen && (
        <div
          className="position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: 'rgba(220, 231, 243, 0.5) ', zIndex: 9999 ,opacity:'1'}}
          onClick={closeLightBox} 
        >
          <div
            className="position-relative"
            onClick={(e) => e.stopPropagation()} 
          >
            <img
              src={currentImg}
              alt="Selected"
              style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '10px' }}
            />
            <i
              onClick={closeLightBox}
              className="fa-solid fa-xmark position-absolute top-0 end-0 text-white fs-2 p-3"
              style={{ cursor: 'pointer' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
