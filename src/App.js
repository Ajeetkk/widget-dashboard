import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import Axios from 'axios';
import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {FirstWidgets, SecondWidgets} from "react-multiple-widgets-app";

import * as widgetscomponent from "react-multiple-widgets-app";
var W1 = widgetscomponent['FirstWidgets']; 
   var W2 = widgetscomponent['SecondWidgets']; 

function App() {
  // const myHandler = (e,props) => props.dispatch(something());
  let [widget, setWidget] = useState([]);
  
   
  useEffect(()=>{
    // alert("didmount");
    setTimeout(() => {
      
      // alert("didmount")
      Axios.get('http://localhost:3000/allwidgets')
      .then((response) => {
        // alert(response.widget_name);
        setWidget({
          widgetID:response.widget_id,
          widgetName:response.data,
              });
              console.log(response.data);
        //  console.log(response.data[0].widget_name);
      })


    }, 1000);
  },[])

  const myHandler = (widgetID,widgetName) => {
    
    // widgetappend.push(wdnm)
    
        
   
  
  
    // alert(wdid);
    // alert(wdnm);


    setTimeout(() => {
      // alert(widgetID);
      // alert(widgetName);
      
            Axios.post('http://localhost:3000/insertWidget',{
              widget_id:widgetID,
              widget_name:widgetName,
            })
            .then((response) => {
              // alert(response);
      
               console.log("insert "+response);
               Axios.get('http://localhost:3000/allwidgets')
               .then((response) => {
                //  alert(response);
                 // alert(response.widget_name);
                 setWidget({
                   widgetID:response.widget_id,
                   widgetName:response.data,
                       });
                       console.log("select "+response.data);
                 //  console.log(response.data[0].widget_name);
               })
            })

           
      
      
          }, 1000);
  }


  const myDeleteHandler = (widgetID) => {
  //  alert(widgetID);

    setTimeout(() => {
      
            Axios.delete(`http://localhost:3000/deletewidget/${widgetID}`)
            .then((response) => {
              // alert(response);
      
               console.log(response);

               Axios.get('http://localhost:3000/allwidgets')
               .then((response) => {
                 // alert(response.widget_name);
                 setWidget({
                   widgetID:response.widget_id,
                   widgetName:response.data,
                       });
                       console.log(response.data);
                  // console.log(response.data[0].widget_name);
               })
            })

          
      
      
          }, 1000);
  }


let FinalWidgets = [];
let WidgetIDs = [];
  let WD1 = widget.widgetName;
  WD1 && WD1.length>0 && WD1.map((data, index)=>{
      console.log("output"+data.widget_name);
      FinalWidgets.push(widgetscomponent[data.widget_name]);
      WidgetIDs.push(data.widget_id);

  })
  // widgetscomponent[widget.widgetName];

return (
<div>
<Container style={{marginTop:"50px"}}>
  <Row>
    <Col sm={8}>
    
     {
       FinalWidgets && FinalWidgets.length>0 && FinalWidgets.map((Data, index)=>
     
      <div key={index}>
      <Row >
      <Col sm={8}>
            <Data />
      </Col>
      <Col sm={4}>
        <Button onClick={(e) => myDeleteHandler(WidgetIDs[index])}>Remove</Button>
      </Col>

     </Row>
     <br />
     </div>
  )}
         
      
    </Col>
    <Col sm={4}>
      <Row>
        <Col sm={6}>
          <W1 />
        </Col>
        <Col sm={6}>
          <Button onClick={(e) => myHandler(1,"FirstWidgets")}>Show</Button>
          {/* this.handleWidget("wd1","<FirstWidgets />")} */}
        </Col>
  
      </Row><br />
      <Row>
        <Col sm={6}>
          <W2/>
        </Col>
        <Col sm={6}>
        <Button onClick={(e) => myHandler(2,"SecondWidgets")}>Show</Button>
        </Col>
  
      </Row>
    
    
      
    </Col>
  </Row>
  
</Container>
</div>
  );
}

export default App;
