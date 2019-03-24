import React from 'react';
import ipfs from './ipfs';
import {Table,Button,Media } from 'react-bootstrap';


export class Directory extends React.Component{

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

      constructor(props)
      {
        super(props);
            var source=this.props.source

      }//constructor

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

          <td ><Button value={file.name} className="glyphicon glyphicon-remove" onClick={this.deleteFiles.bind(this,file.name)} ></Button></td>

          </tr>

        );
      });

    return(
      <div>




                          <h2>ipfs{this.props.source}</h2>

                          <Table bordered responsive striped hover >
                          <thead>
                            <tr>
                          <td>File Name</td>
                          <td>File ess</td>
                          <td>Click Button to Delete</td>
                            </tr>
                          </thead>
                            <tbody>
                            {listItems}
                            </tbody>
                          </Table>



      </div>
    );
  }
}
