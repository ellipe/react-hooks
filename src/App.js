import './App.css';
import Header from './components/Header'
import Characters from './components/Characters'
import ThemeContext from './context/ThemeContext'
import React, { useContext } from 'react'


function App() {

  const { color } = useContext(ThemeContext)
  return (
    <div className={`App ${color}`}>
      <Header />
      <Characters />
    </div>
  );
}

export default App;
