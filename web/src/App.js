import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Login';
import Signup from './Signup';
import Project from './Project';
import CreateProject from './CreateProject';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/project/:id" component={Project} />
        <Route path="/projects/submit" component={CreateProject} />
      </Switch>

    </Router>
  );
}

export default App;
