import React, { useReducer } from 'react';
import './App.css';
import DataFetchingTwo from './components/DataFetchingTwo';
import {Route,Switch} from 'react-router-dom';
import Favourite from "./components/Favourite";

function App(){
    return (
          <>
            <Switch>
                <Route exact path='/favourite' component={Favourite}/>
                <Route exact path='/' component={DataFetchingTwo}/>
            </Switch>
          </>
    );
}

export default App;
