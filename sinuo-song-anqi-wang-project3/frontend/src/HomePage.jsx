import React from 'react'
import './style/Header.css';

export default function HomePage() {
  return (
      <div className="centered">
        <h1 className="moving-text">
          <span className="green">Welcome </span>
          <span className="grey"> To </span>
          <span className="yellow"> Twitter</span>
        </h1>
      </div>
  )
}