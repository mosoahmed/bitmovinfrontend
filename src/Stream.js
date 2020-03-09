import React from 'react';

export default class Stream extends React.Component{

      constructor(props){
          super(props);
          console.log(this.props.streams);
      }



      renderContent(){
          
        if(this.props.streams !=null ){
            //console.log(this.props.encodings.items)
          return this.props.streams.items.map((stream) => (
              <li key={stream.id} id={stream.id}>
              {stream.name} 
              </li>
          ))
        }
    }


    render(){
        return(
            <div>
            <h2>Streams</h2>
            <ul>{this.renderContent()}</ul>               
            </div>
        );
    };


}