import React from 'react';

export default class Muxing extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props.muxings);
    }



    renderContent(){
        
      if(this.props.muxings !=null ){
          //console.log(this.props.encodings.items)
        return this.props.muxings.items.map((muxing) => (
            <li key={muxing.id} id={muxing.id}>
            {muxing.name} 
            </li>
        ))
      }
  }


  render(){
      return(
          <div>
           <h2>Muxings</h2>
          <ul>{this.renderContent()}</ul>               
          </div>
      );
  };


}