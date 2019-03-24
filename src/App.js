import React, { Component } from 'react';
import './components/App.css';
import favicon from './components/favicon.ico';
import {Directory} from './components/DirectoryList.js';
import {AddFile} from './components/AddFile.js';
import {Table,Button,Div } from 'react-bootstrap';

class App extends Component {



    render() {
      return (


        <div className='Main'>

        <center>
            <img src={favicon} width="10%" height="10%"/>
            <h1>IPFS File Manager</h1>
            <AddFile/>
        </center>
            <div className="container">


            <div className="ibox-content" size="100%">
            <div class="p-3 mb-2 bg-dark text-white">

            <Directory  source='/Files' / >
            <Directory  source='/Photos'/ >
            <Directory  source='/Misc'/ >
            </div>
            </div>
            </div>
        </div>



      );
    }
}

export default App;
