import React from 'react';
import ipfs from './ipfs';
import {Table,Button } from 'react-bootstrap';


export class Directory extends React.Component{

      state={

        file:[
              {
              name: "",
              type: null,
              size: null,
              hash: ""},
             ],
        data:'',

        email: {
          sender: 'noreply@Homesave',
          subject: 'File shared with you from Homesave',
          text: ''
          }
        }

        sendEmail (hash,name,props){
          var url=`ipfs.io/ipfs/${hash}`
          var recipient=this.refs.recepid.value;
          this.setState({recipient});
          console.log(recipient);
          fetch(`http://127.0.0.1:4000/send-email?recipient=${recipient}&sender=${this.state.email.sender}&topic=${this.state.email.subject}&text=${name}${url}`).catch(err => console.error(err))
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

              }
          }.bind(this),
        )
      }
      componentDidMount(props)
          {
            this.getData();
          }


  render()
  {
    let listItems = this.state.file.map(file => {
        return (

          <tr>
          <td value={file.name}>{file.name}</td>
          <td><a href={`https://ipfs.io/ipfs/${file.hash}`}>{file.hash}</a></td>
          <td >
          <input type="text" id="recepid" ref="recepid" placeholder = {"Enter recipient`s email-id"}/>
          <Button value={file.hash} className="button" onClick={this.sendEmail.bind(this,file.hash,file.name)} >Share</Button>
          </td>
          <td ><Button value={file.name} className="button" onClick={this.deleteFiles.bind(this,file.name)} >Delete</Button>
          </td >
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
      <div className="container">
                          <Table bordered responsive striped hover width="75%">
                          <thead>
                            <tr>
                          <td>File Name</td>
                          <td>File hash</td>
                          <td>Share File</td>
                          <td>Delete File</td>
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
