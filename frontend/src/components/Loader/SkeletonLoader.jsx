import React from 'react';
import './SkeletonLoader.css'

export const SkeletonLoader = () => {
  return (
    <div className="container p-10">
      <div className="col-sm-6 col-md-3">
        <div className="movie--isloading">
          <div className="loading-image"></div>
          <div className="loading-content">
            <div className="loading-text-container">
              <div className="loading-main-text"></div>
              <div className="loading-sub-text"></div>
            </div>
            <div className="loading-btn"></div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-md-3">
        <div className="movie--isloading">
          <div className="loading-image"></div>
          <div className="loading-content">
            <div className="loading-text-container">
              <div className="loading-main-text"></div>
              <div className="loading-sub-text"></div>
            </div>
            <div className="loading-btn"></div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-md-3">
        <div className="movie--isloading">
          <div className="loading-image"></div>
          <div className="loading-content">
            <div className="loading-text-container">
              <div className="loading-main-text"></div>
              <div className="loading-sub-text"></div>
            </div>
            <div className="loading-btn"></div>
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-md-3">
        <div className="movie--isloading">
          <div className="loading-image"></div>
          <div className="loading-content">
            <div className="loading-text-container">
              <div className="loading-main-text"></div>
              <div className="loading-sub-text"></div>
            </div>
            <div className="loading-btn"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

