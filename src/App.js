import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './components/App.css';
import {Directory} from './components/DirectoryList.js';
import {AddFile} from './components/AddFile.js';
import {EDirectory} from './components/encrypteddir.js';
import Navigation from "./components/Navigation";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path="/" component={AddFile} exact/>
            <Route path="/Files" render={(props) => <Directory key={'1'} {...props} source={'/Files'} />}/>
            <Route path="/Photos" render={(props) => <Directory key={'2'} {...props} source={'/Photos'} />}/>
            <Route path="/Misc" render={(props) => <Directory key={'3'} {...props} source={'/Misc'} />}/>
            <Route path="/Encrypted" render={(props) => <EDirectory key={'4'} {...props} source={'/Encrypted'} />}/>
            <Route path="/Decrypted" render={(props) => <Directory key={'5'} {...props} source={'/Decrypted'} />}/>

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
};

export default App;
