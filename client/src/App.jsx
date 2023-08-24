import React, { useEffect } from 'react'
import { BrowserRouter as Router } from "react-router-dom"
import Header from './components/Layout/Header/Header';
import WebFont from "webfontloader";
import Footer from './components/Layout/Footer/Footer';


const App = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Robot", "Droid sans", "Chilanka"]
      }
    })
  }, [])
  return (
    <Router>
      <div style={{ height: "100vh", border: "1px solid red" }}>
        <Header />
        <Footer />

      </div>
    </Router>
  )
}

export default App