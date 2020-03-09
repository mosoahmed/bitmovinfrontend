import React from 'react';
import Muxing from './Muxing';
import Stream from './Stream';

export default class Encoding extends React.Component{

      constructor(props){
          super(props);
          this.state = ({
              encodingId:null
          })
          this.loadEncodingDetailsHandlers = this.loadEncodingDetailsHandlers.bind(this);
      }

      loadEncodingDetailsHandlers = (event) => {
        console.log("encodingId:#"+event.target.id);
        this.setState({encodingId:event.target.id})
        this.props.loadStreams(event.target.id);
        this.props.loadMuxings(event.target.id);
      }


      renderContent(){
          
          if(this.props.encodings !=null ){
              //console.log(this.props.encodings.items)
            return this.props.encodings.items.map((encoding) => (
                <li key={encoding.id} id={encoding.id} onClick={this.loadEncodingDetailsHandlers}>
                {encoding.name} 
                </li>
            ))
          }
      }


      render(){
          return(
              <div>
              <ul>{this.renderContent()}</ul>               
              </div>

          );
      }



}