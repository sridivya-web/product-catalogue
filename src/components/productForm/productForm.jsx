import React, { Component } from 'react';
import {
    FormBuilder,
    FieldGroup,
    FieldControl,
    Validators,
 } from "react-reactive-form";
 import TextField from '@material-ui/core/TextField';
 import Button from '@material-ui/core/Button';
 import './productform.css';
 
const TextInput = ({ handler, touched, hasError, meta }) => (
  <div>
    <TextField placeholder={`Enter ${meta.label}`} {...handler()}/>
    <span>
        {touched
        && hasError("required")
        && `${meta.label} is required`}
    </span>
  </div>  
)
export default class ProductForm extends Component {

  constructor(props) {
    super();
    this.state = {

          newProduct : {}
    }
  
  }

    loginForm = FormBuilder.group({
        productimage: ["", Validators.required],
        productname: ["", Validators.required],
        producturl: ["", Validators.required],
        quantity: ["", Validators.required],
        price: ["", Validators.required]
        
    });
    handleReset=() => {
        this.loginForm.reset();
    }
    handleSubmit=(e) => {
        e.preventDefault();
       // console.log("Form values", this.loginForm.value);  
          
        let items = this.loginForm.value;
        this.setState({
          newProduct : items
        })
         
        this.props.addProduct(items);
       
    }
    render() {
     
        return (
            <div className="product">
              <FieldGroup
                control={this.loginForm}
                render={({ get, invalid }) => (
                  <form onSubmit={this.handleSubmit}>
 
                   <FieldControl
                      name="producturl"
                      render={TextInput}
                      meta={{ label: "Product Url" }}
                    />
                     
                     <FieldControl
                      name="productimage"
                      render={TextInput}
                      meta={{ label: "Product Image" }}
                    />
                     
                     <FieldControl
                      name="productname"
                      render={TextInput}
                      meta={{ label: "Product Name" }}
                    />

                    <FieldControl
                      name="quantity"
                      render={TextInput}
                      meta={{ label: "Quantity" }}
                    />
                     <FieldControl
                      name="price"
                      render={TextInput}
                      meta={{ label: "Price" }}
                    />
                    <div className="productButton">
                    <Button 
                     variant="contained" color="primary"
                      onClick={this.handleReset}
                    >
                      Reset
                    </Button>  
                    <Button  id="btn" onClick={this.handleSubmit}
                     variant="contained" color="primary"
                 >
                      Submit
                    </Button>
                    </div>
                  </form>
                 
                )}
              />
               </div>
             
        );
    }
}