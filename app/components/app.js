import React from 'react';

import Header from './header';
import Main from './main';
import Footer from './footer';

import './app.css';

const App = () => {
  return (
    <div className='app'>
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;
