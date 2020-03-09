import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import BitmovinApi from '@bitmovin/api-sdk';
import Encoding from './Encoding'
import Stream from './Stream'
import Muxing from './Muxing'
//piKey: 71bdeded-cc83-4196-ba36-dcccedf85e6f
let bitmovinApi = null;
export default class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      apikey:null,
      encodings:null,
      streams:null,
      muxings:null,
      errors:null
    };

    this.changeApiKeyHanlder = this.changeApiKeyHanlder.bind(this);
    this.loadEncodingsHandler = this.loadEncodingsHandler.bind(this);
    this.loadStreamsHandler = this.loadStreamsHandler.bind(this);
    this.loadMuxingsHandler = this.loadMuxingsHandler.bind(this);
  }

  changeApiKeyHanlder = (event) => {
    this.setState({
      apikey:event.target.value,
      encodings:null,
      streams:null,
      muxings:null,
      errors:null
    });
    //const bitmovinApi = new BitmovinApi({apiKey: this.state.apikey});
  }

  loadStreamsHandler = (encodingId) => {
    if(encodingId){
      let newState = this.state;
              let streams = bitmovinApi.encoding.encodings.streams.list(encodingId);
                  streams.then((streamsResolved) => {
                    newState.streams = streamsResolved;
                    this.setState(newState);
                    console.log(streamsResolved);
                  }, (error) => {
                    newState.errors = error;
                    this.setState(newState);
                    console.log(error);
                  });
    }
    
  }

  loadMuxingsHandler = (encodingId) => {
    if(encodingId){
      let newState = this.state;
        let muxings = bitmovinApi.encoding.encodings.muxings.list(encodingId);
        muxings.then((muxingsResolved) => {
              newState.muxings = muxingsResolved;
              this.setState(newState);
              console.log(muxingsResolved);
            }, (error) => {
              newState.errors = error;
              this.setState(newState);
              console.log(error);
            });
    }
    
  }

  
  loadEncodingsHandler = (event) => {
    event.preventDefault();
    console.log(this.state.apikey);
    if(this.state.apikey !=null && this.state.apikey != ""){
       //setup Api Class for getting encodings list maximum 10
       bitmovinApi = new BitmovinApi({apiKey: this.state.apikey});
       console.log(bitmovinApi);
       let newState = this.state;
       let encodings = bitmovinApi.encoding.encodings.list(q => q.offset(0).limit(10).sort("createdAt:desc"));
           encodings.then((encodingsResolved) => {
             newState.encodings = encodingsResolved
             this.setState(newState);
              console.log(this.state.encodings);
           }, (error) => {
             newState.errors = error;
             this.setState(newState);
             console.log(this.state.errors);
           });
    }
  }

 

//loadEncodeInfo(id){
//   console.log("dsdsd");
//   const streams = bitmovinApi.encoding.encodings.streams.list(id)
//   streams.then((resolvedValue) => {
//     console.log(resolvedValue.items);
//     this.setState({ streams : resolvedValue.Items })
// }, (error) => {
//     console.log(error);
// });

// }
       render(){
        return (
          <div>
          <form>
         <p>Enter your API Key:</p>
         <input type='text' onChange={this.changeApiKeyHanlder}/>
         <button type='button' onClick={this.loadEncodingsHandler}>Load Encodings</button>
         </form>
         <Encoding encodings={this.state.encodings} loadStreams={this.loadStreamsHandler} loadMuxings={this.loadMuxingsHandler}/>
         <Stream streams={this.state.streams} />
         <Muxing muxings={this.state.muxings} />
         </div> 
        );
       }
            


  //   render(){
  //     let nodes;
  //     let streams_;
  //     if(this.state.data !=null){
  //          nodes = this.state.data.map(function(encoding) {                   
  //                 return (
  //                   // <Node node={person} children={person.people} />
  //                   <ListGroup.Item key={encoding.id} id={encoding.id} onClick={this.loadEncodeInfo.bind(this,encoding.id)}>{encoding.name}</ListGroup.Item>
  //                 );
  //               },this);      
  //     }
  //     if(this.state.streams !=null){
  //       streams_ = this.state.streams.map(function(stream) {                   
  //              return (
  //                <h1>Streams</h1>,
  //                <ListGroup.Item key={stream.id} id={stream.id}>{stream.name}</ListGroup.Item>
  //              );
  //            });      
  //  }
//    if(this.state.streams !=null){
//     nodes = this.state.data.map(function(encoding) {                   
//            return (
//              <h1>Muxs</h1>,
//              <ListGroup.Item key={encoding.id} id={encoding.id} onClick={() => this.loadEncodeInfo()}>{mux.name}</ListGroup.Item>
//            );
//          });      
// }
     
    //   return  (
    //           <Container>
    //             <Row>
    //               <Col>
    //               <ListGroup>
    //                           {nodes}
    //               </ListGroup>
    //               </Col>
    //             </Row>
    //             <Row>
    //               <Col>
    //               <ListGroup>
    //                           {streams_}
    //               </ListGroup>
    //               </Col>
    //             </Row>
    //           </Container>

    //   )
    // }
}

