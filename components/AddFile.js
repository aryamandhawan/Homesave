import {Table, Grid, Button, Form } from 'react-bootstrap';
import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import {Directory} from './DirectoryList.js';
import ipfs from './ipfs';
import storehash from './storehash';
import ReactDropzone from "react-dropzone";

export class AddFile extends React.Component{

      state = {
        ipfsHash:null,
        buffer:'',
        file_name:'',
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
         console.log(file.name);
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
              const destination=`/dev/${this.state.file_name}`;

            ipfs.files.cp([source,destination], (err) => {
              if (err)
                {
                  console.error(`could not add to ipfs MFS`,this.state.ipfsHash)
                }
                else
                (
                  console.log(this.state.ipfsHash,`added to IPFS MFS`)
                )
               })


              let url = `https://ipfs.io/ipfs/${this.state.ipfsHash}`
              console.log(`Url --> ${url}`)
              document.getElementById("url").innerHTML= url
              document.getElementById("url").href= url
              document.getElementById("output").src = url

              // storehash.methods.sendHash(this.state.ipfsHash).send({
              //   from: accounts[0]
              // }, (error, transactionHash) => {
              //   console.log(transactionHash);
              //   this.setState({transactionHash});
              // });

      })//await ipfs-add

  };//onsubmit

    render() {
      return (
<div>
<Grid>
          <h3> Choose file to send to IPFS </h3>
          <Form onSubmit={this.onSubmit}>
            <input
              type = "file"
              onChange = {this.captureFile}
            />

             <Button type="submit" >
             Send it
             </Button>

          </Form>

          <hr/>
{/*            <Table bordered responsive>
                <thead>
                  <tr>
                    <th>Tx Receipt Category</th>
                    <th>Values</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>IPFS Hash # stored on Eth Contract</td>
                    <td>{this.state.ipfsHash}</td>
                  </tr>
                  <tr>
                    <td>Ethereum Contract Address</td>
                    <td>{this.state.ethAddress}</td>
                  </tr>

                  <tr>
                    <td>Tx Hash # </td>
                    <td>{this.state.transactionHash}</td>
                  </tr>

                  <tr>
                    <td>Block Number # </td>
                    <td>{this.state.blockNumber}</td>
                  </tr>

                  <tr>
                    <td>Gas Used</td>
                    <td>{this.state.gasUsed}</td>
                  </tr>
                </tbody>

            </Table>
*/}



            {/*<Button onClick = {this.onClick}> Get Transaction Receipt </Button>*/}

            <div>
            <br></br><br></br>
              File added by you:
              <br></br>
              <div class="col-md-3 col-sm-6">
                <div class="thumbnail">
                     <img id="output"></img>

                </div>
            </div>

            </div>
            <div>
            <br></br><br></br>
              File Link on IPFS:
              <br></br>
                <a id="url"></a>
              <br></br>


            </div>
        </Grid>

     </div>


      );
    }
}
