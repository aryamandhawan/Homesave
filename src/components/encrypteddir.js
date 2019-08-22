import React from 'react';
import ipfs from './ipfs';
import {Table,Button } from 'react-bootstrap';
const CryptoJS = require('crypto-js');
export class EDirectory extends React.Component{

      state={
        file:[
              {
              name: "",
              type: null,
              size: null,
              hash: ""},
             ],
        data:''
      };


      deleteFiles(rmfname,props)
      {
        var rmfile=`${this.props.source}/${rmfname}`
        ipfs.files.rm(rmfile, (err) => {
          if (err) {
            console.error(err)
          }
          else console.log("removedfilefromDB",rmfile)
          this.getData();
        })

      }


      getData(){
        console.log("DirectoryList did mount");
        ipfs.files.ls(this.props.source,{l: true}, function (err, res) {
              if (err)
                {
                    console.log(err)
                }
              else
                {

                this.setState({file:res});

                // this.filesls(this.state.file,this.props.source);

              }
          }.bind(this),
        )
      }

      decFile(name,props)
      {

        var dpassword=this.refs.password.value
        console.log(dpassword);
        //Buffer from encrypted file
        if(dpassword===''){
          alert('no password entered');

        }
        else{
      ipfs.files.read(`/Encrypted/${name}`, (error, buf) => {
        buf=buf.toString('utf8')
        console.log(buf)

        //Decrypt
        var bytes  = CryptoJS.AES.decrypt(buf, dpassword);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log(decryptedData);

        const buffer = Buffer.from(decryptedData);
        this.setState({buffer});
        console.log(buffer);

        ipfs.add(this.state.buffer, (err, ipfsHash) =>
            {
                    console.log(err,ipfsHash);
                    this.setState(
                      { ipfsHash:ipfsHash[0].hash }
                    );
                    const source=`/ipfs/${this.state.ipfsHash}`;
                    var destination=`/Decrypted/${name}`;

            ipfs.files.cp([source,destination], (err) => {
                    if (err)
                      {
                        console.error(`could not add to ipfs MFS`,err,this.state.ipfsHash)
                      }
                      else
                      (
                        console.log(this.state.ipfsHash,`added to IPFS MFS`),
                        alert(name+" added to "+destination)
                      )
                     })
                  // storehash.methods.sendHash(this.state.ipfsHash).send({
                    //   from: accounts[0]
                    // }, (error, transactionHash) => {
                    //   console.log(transactionHash);
                    //   this.setState({transactionHash});
                    // });
            })//await ipfs-add

        })
      }
      }
      componentDidMount(props)
          {
            this.getData();
          }//component mounted


  render()
  {
    let listItems = this.state.file.map(file => {
        return (

          <tr>
          <td value={file.name}>{file.name}</td>
          <td><a href={`https://ipfs.io/ipfs/${file.hash}`}>{file.hash}</a></td>

          <td ><Button value={file.name} className="button" onClick={this.deleteFiles.bind(this,file.name)} >Delete</Button>
          </td >
          <td >
          <Button value={file.name} className="button" onClick={this.decFile.bind(this,file.name)} >Decrypt</Button>
          </td>

          </tr>

        );
      });

    return(
      <div>

      <center>
      <div className="container">


 <br/><br/>
      <h2>ipfs{this.props.source}</h2>
      <br/><br/>
      <h3>Enter Password for Decryption</h3>
      <input type="password" id="password" ref="password" placeholder = {"Enter password"}/>
      <br/><br/>
      <div className="container">
                          <Table bordered responsive striped hover width="75%">
                          <thead>
                            <tr>
                          <td>File Name</td>
                          <td>File hash</td>
                          <td>Delete File</td>
                          <td>Decrypt File</td>
                            </tr>
                          </thead>
                            <tbody>
                            {listItems}
                            </tbody>
                          </Table>
                          </div>
                          </div>

      </center>

      </div>
    );
  }
}
