
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import './assetss/css/App.css';
import Login from './components/Login';
import LoginAdmin from './components/LoginAdmin';
import PaginaAdmin from './components/PaginaAdmin';
import Dashboard from './components/Dashboard';
import axios from 'axios';



function App() {
  return (
    <React.Fragment>
    <Router>
        <Switch>
            <Route path="/" exact render ={ props=> (<Login {...props}/>)}></Route>
            <Route path="/LoginAdmin" exact render ={ props=> (<LoginAdmin {...props}/>)}></Route>
            <Route path="/Dashboard" exact render ={ props=> (<Dashboard {...props}/>)}></Route>
            <Route path="/PaginaAdmin" exact render ={ props=> (<PaginaAdmin {...props}/>)}></Route>
        </Switch>
    </Router>
    </React.Fragment>

  );
}

export default App;
