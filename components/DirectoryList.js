import React from 'react';
import ipfs from './ipfs';
import {Table, Button } from 'react-bootstrap';


export class Directory extends React.Component{

constructor(){
  super();

    ipfs.files.ls('/dev',{l: true}, function (err, res) {
          if (err)
            {
                console.log(err)
            }
          else
            {
                for (var i = 0; i < res.length; i++)
                  {
                      console.log(res[i])
                      ListFiles(res,i)
                  }
            }
      })


      function ListFiles(res,i)
      {

          let url = `https://ipfs.io/ipfs/${res[i].hash}`
          var x = document.getElementById("files_ls").insertRow(1);
          var y = x.insertCell(0);
          var z = x.insertCell(1);
          var Link = document.createElement('a');
          var href=url;
          Link.href = href;
          Link.innerHTML = res[i].hash;
          z.appendChild(Link);
          var a = x.insertCell(2);
          var b = x.insertCell(3);
          // document.getElementById("Link").innerHTML=res[i].hash
          // document.getElementById("Link").href= url
          //  document.getElementById("output").src = url
          y.innerHTML = res[i].name;
          a.innerHTML = res[i].size;
          if (res[i].type===1)
            {
                b.innerHTML ='Directory' ;
                console.log(res[i]);
            }
          else if (res[i].type===0)
            {
                b.innerHTML ='File' ;
            }
        }
      }

      componentDidMount() {
        console.log("component did mount");

}


  render()
  {
    return(
      <div>

      <Table id="files_ls" bordered responsive>
      <thead>

        <tr>
          <th>Name</th>
          <th>Hash</th>
          <th>Size</th>
          <th>Type</th>

        </tr>

      </thead>
      <tbody>

      </tbody>
      </Table>
      </div>
    );
  }
}
