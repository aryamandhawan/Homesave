import { Grid, Button, Form } from 'react-bootstrap';
import React from 'react';
import './App.css';
import ipfs from './ipfs';
import {Directory} from './DirectoryList.js';


export class AddFile extends React.Component{

      state = {
        ipfsHash:null,
        buffer:'',
        file_name:'',
        fileext:'',
        url:''
        // ethAddress:'',
        // blockNumber:'',
        // transactionHash:'',
        // gasUsed:'',
        // txReceipt: '',
      };



    captureFile =(event) =>
     {
         const file = event.target.files[0]
         this.state.file_name=file.name
         this.state.fileext=this.state.file_name.split('.').pop();
         console.log(file.name);
         console.log(this.state.fileext);

         let reader = new window.FileReader()
         reader.readAsArrayBuffer(file)
         reader.onloadend = () => this.convertToBuffer(reader)
       };

    convertToBuffer = async(reader) =>
    {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };


    onSubmit = async (event) =>
    {


  await ipfs.add(this.state.buffer, (err, ipfsHash) =>
      {
              console.log(err,ipfsHash);

              this.setState(
                { ipfsHash:ipfsHash[0].hash }
              );

              const source=`/ipfs/${this.state.ipfsHash}`;
              var destination=`/Photos/${this.state.file_name}`;
              if(this.state.fileext===`jpg` || this.state.fileext===`jpg` || this.state.fileext===`png` || this.state.fileext===`jpeg`)
                {
                  destination=`/Photos/${this.state.file_name}`;
                }
                else if (this.state.fileext===`pdf` || this.state.fileext===`doc` || this.state.fileext===`txt`)
                {
                  destination=`/Files/${this.state.file_name}`;
                }
                else
                {
                  destination=`/Misc/${this.state.file_name}`;
                }

      ipfs.files.cp([source,destination], (err) => {
              if (err)
                {
                  console.error(`could not add to ipfs MFS`,err,this.state.ipfsHash)
                }
                else
                (
                  console.log(this.state.ipfsHash,`added to IPFS MFS`)
                )
               })



              // storehash.methods.sendHash(this.state.ipfsHash).send({
              //   from: accounts[0]
              // }, (error, transactionHash) => {
              //   console.log(transactionHash);
              //   this.setState({transactionHash});
              // });

      })//await ipfs-add

      // MAKE IT RENDER AAIN FTER TIS.

  };//onsubmit

  componentOnMount(){
    return(
      <Directory  source='/Files' / >
    )
  }

    render() {
      return (
<div >


<div className="container">

                <div className="file-manager">

      <h3> Choose file to send to IPFS </h3>
      <Form onSubmit={this.onSubmit}>
      <br />
      <input className="btn btn-primary " type = "file" style={{marginLeft: '0em'}} onChange = {this.captureFile} />
      <br />
      <Button className="btn btn-primary " type="submit" style={{marginLeft: '0em'}}>Upload Files</Button>
      <br /><br />
      </Form>

            </div>

    </div>

</div>
      );
    }
}
