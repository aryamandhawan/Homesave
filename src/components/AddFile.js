import {Table,Button, Form } from 'react-bootstrap';
import React from 'react';
import ipfs from './ipfs';
const CryptoJS = require('crypto-js');

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
      constructor(props)
      {
        super(props);
        console.log('/Files');
        ipfs.files.mkdir('/Files');
        ipfs.files.mkdir('/Photos');
        ipfs.files.mkdir('/Misc');
        ipfs.files.mkdir('/Encrypted');
        ipfs.files.mkdir('/Decrypted');

      }

 captureFile =(event) =>
     {
       event.stopPropagation()
       event.preventDefault()
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
           console.log(reader.result);

           console.log('buffer',buffer);

       };

        captureFile2 =(event) =>
        {
        event.stopPropagation()
        event.preventDefault()
          const file = event.target.files[0]
          this.state.file_name=file.name
          this.state.fileext=this.state.file_name.split('.').pop();
          console.log(file.name);
          console.log(this.state.fileext);
          console.log('file',file);

 let reader = new window.FileReader()

          // reader.readAsBinaryString(file) //doesnt work for potos
          reader.readAsText(file) //doesnt work for potos
          // reader.readAsDataURL(file)
          // reader.readAsArrayBuffer(file)
          // console.log('reader',reader);
          reader.onloadend = () => this.convertToBuffer2(reader)

        };

    convertToBuffer2 = async(reader) =>
    {
      // const pass=getElementById('password')
      // console.log(pass);
      // Encrypt
      console.log(reader.result);
      var password=this.refs.password.value
      if(password===''){
        alert('No password entered');
      }
      else{
      //console.log(password);
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(reader.result), password).toString();
      //console.log(ciphertext);
      const buffer = await Buffer.from(ciphertext);
      this.setState({buffer});
      //console.log(buffer);
    }
    };

 onSubmit = async (event) =>
    {
      event.preventDefault()
  await ipfs.add(this.state.buffer, (err, ipfsHash) =>
      {
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

               })


            // storehash.methods.sendHash(this.state.ipfsHash).send({
              //   from: accounts[0]
              // }, (error, transactionHash) => {
              //   console.log(transactionHash);
              //   this.setState({transactionHash});
              // });
      })//await ipfs-add
  };//onsubmit

  onSubmit2 = async (event) =>
  {
    event.preventDefault()
await ipfs.add(this.state.buffer, (err, ipfsHash) =>
    {
            console.log(err,ipfsHash);
            this.setState(
              { ipfsHash:ipfsHash[0].hash }
            );
            const source=`/ipfs/${this.state.ipfsHash}`;
            var destination=`/Encrypted/${this.state.file_name}`;
    ipfs.files.cp([source,destination], (err) => {
            if (err)
              {
                alert(`could not add to IPFS MFS file already e`)
              }
              else
              (
                //console.log(this.state.ipfsHash,`added to IPFS MFS`),
                alert(this.state.file_name+" added to "+destination)
              )
             })
          // storehash.methods.sendHash(this.state.ipfsHash).send({
            //   from: accounts[0]
            // }, (error, transactionHash) => {
            //   console.log(transactionHash);
            //   this.setState({transactionHash});
            // });
    })//await ipfs-add
};//onsubmit

    componentOnMount(){

    }
    render() {
      return (
<div>
<div className="container">
<div className="file-manager">
      <br /><br />
      <Table>
      <tr>
      <td>
      <h3> Choose file to send to IPFS </h3>
      <Form onSubmit={this.onSubmit}>
      <br />
      <input type = "file" style={{marginLeft: '0em'}} onChange = {this.captureFile} />
      <Button type="submit" style={{marginLeft: '0em'}}>Upload Files</Button>
      <br /><br />
      </Form>
      </td>
      <td>
      <h3> Choose file to send to IPFS with Encryption</h3>
      <Form onSubmit={this.onSubmit2}>
      <br />
      <h4>Enter password for Encryption</h4>
      <p>**Must remember your password**</p>

      <input type="password" id="password" ref="password" placeholder = {"Enter password"}/>
      <br />  <br />
      <input type = "file" style={{marginLeft: '0em'}} onChange = {this.captureFile2} />


 <Button type="submit" style={{marginLeft: '0em'}}>Upload Files</Button>
      <br />
      <br />
      </Form>
      </td>
      </tr>
      </Table>
</div>
</div>
</div>
      );
    }
}
