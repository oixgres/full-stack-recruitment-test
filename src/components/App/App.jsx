import React from 'react';

import Header from '../Header';
import { Flights } from '../Flights';

import STYLES from './App.scss';
// import 'semantic-ui-css/semantic.min.css';


const getClassName = (className) => STYLES[className] || 'UNKNOWN';
const file = `${process.env.PUBLIC_URL}flights.json`;

const App = () => (

  <div className={getClassName('App')}>
    <Header />
    <main className={getClassName('App__main')}>
      <Flights file={file}></Flights>
      {/* TODO: Add a component to display results here */}
    </main>
  </div>
);

export default App;
