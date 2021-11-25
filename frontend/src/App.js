import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"

// import UsersList from './components/Users/UsersList'

import Readings from './components/my_readings'

function App() {
  return (
    <Router>
      <div className="container">
        <br/>
        <Route exact path="/"><Redirect to="/readings"/></Route>
        <Route path="/readings" component={Readings}/>
      </div>
    </Router>
  );
}

export default App;
