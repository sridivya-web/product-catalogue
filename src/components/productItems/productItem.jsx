import React from 'react';
import { Component } from "react";
import './productItem.css';
import ProductCharts from '../BarChart/productchart';
import { getProducts,saveProduct, addProduct,deleteProduct } from './services';
import ProductForm from '../productForm/productForm';


export default class ProductItems extends Component {
    constructor() {
        super();
        this.productsItems = [];
        this.state ={
            editMode: false,
            productsList:[],
            editId:'',
            productName:'',
            productPrice:'',
            productQuantity:'',
            productUrl:'',
            productImage:''
        }
       
        //this.addItem = this.addItem.bind(this);
    }
    componentDidMount() {
        getProducts().then(response => {
            this.productsItems = response.data; 
            this.setState({
                productsList : this.productsItems
            });
          });
     
        console.log("component did mount",this.state.productsList);
      }

    handleEdit(id) {
    //  const editItems = this.state.productsList.filter(item => 
    //         item.id === id);
            this.setState({  
                editMode:true,
                editId : id
            })
        }
       
       handleCancel = () => {      
        this.setState({  
            editMode:false,
            productsList:this.productsItems
        })
      };  

      handleDelete(id) {
          console.log(id);
          deleteProduct(id).then(res => {
            console.log("response is",res);
          })
      
           const filteredItems = this.state.productsList.filter(item => 
            item.id !== id);
            this.setState({
                productsList:filteredItems
            })
        console.log(this.state.productsList);
      }
      setUpdate(text,id){
        const list = this.state.productsList;
         list.map(list => { 
            if(list.id === id)
            {
               list.productname = text;
            }
          })
          this.setState({
              productsList:list,
              productName:text       
          })    
    }

      setUpdateUrl(text,id){
          const list = this.state.productsList;
           list.map(list => { 
              if(list.id === id)
              {
                 list.producturl = text;
              }
            })
            this.setState({
                productsList:list,
                productUrl:text       
            })    
      }

      setUpdateImage(text,id){
        const list = this.state.productsList;
         list.map(list => { 
            if(list.id === id)
            {
               list.productimage = text;
            }
          })
          this.setState({
              productsList:list,
              productImage:text       
          })    
    }
  
    
      setUpdateQuan(text,id){
        const list = this.state.productsList;
         list.map(list => { 
            if(list.id === id)
            {
               list.quantity = text;
            }
          })
          this.setState({
              productsList:list,
              productQuantity:text
          })
     
    }
    setUpdatePrice(text,id){
        const list = this.state.productsList;
         list.map(list => { 
            if(list.id === id)
            {
               list.price = text;
            }
          })
          this.setState({
              productsList:list,
              productPrice:text
          })
     
    }
    handleSave(id){  
      
        saveProduct(this.state.productsList,id).then(res => {
            console.log("response is",res);
          })
          this.setState({  
            editMode:false      
       })      
    }

    addItem(items){
       const id = Date.now();
       addProduct(items,id).then(res => {
        console.log("response is",res);
    })
   
    }
   
    render() {
        
        return (
            <div className='main'>
            <div className='cardGrid'>
                     <div>
                      <ProductForm addProduct={this.addItem.bind(this)}/>
                    </div>
              {this.state.productsList.map((product) => 
                   
                    <div  key={product.id}> 
                    {/*style={{backgroundImage: `url(${product.productimage})`}} */}          
                    
                     
                     { this.state.editMode && product.id === this.state.editId ? 
                     (    
                         <div className='cards'>
                          <div className="editTitle">
                          <label>Product Url</label>
                       <input  type="text" value={product.producturl} onChange={(e)=>{
                               this.setUpdateUrl(e.target.value,product.id)}}/> 
                          <label>Product Image</label>
                       <input  type="text" value={product.productimage} onChange={(e)=>{
                               this.setUpdateImage(e.target.value,product.id)}}/> 
                              <label>Product Name</label>
                       <input  type="text" value={product.productname} onChange={(e)=>{
                               this.setUpdate(e.target.value,product.id)}}/> 
                                <label> Quantity</label>
                       <input  type="text" value={product.quantity} onChange={(e)=>{
                               this.setUpdateQuan(e.target.value,product.id)}}/> 
                                <label>Price</label>
                       <input  type="text" value={product.price} onChange={(e)=>{
                               this.setUpdatePrice(e.target.value,product.id)}}/> 
                       <button onClick={ () => this.handleSave(product.id)}>Save</button>
                       </div>  
                       </div>
                     ) :  (  
                          <div className='cards'>
                        <div className="proudctImage">
                        <a href={product.producturl}>
                        <img width="220px" height="250px" src={product.productimage} alt={product.productname}/>
                        </a>
                        </div>
                        <div className="title">
                     <h5>{product.productname}</h5>
                     <h5>{product.quantity > 0 ? 'Available' : 'Unavailable'}</h5>
                     <h5>{product.price}</h5>  
                     <button  onClick={ () => this.handleEdit(product.id)}>Edit</button>
                     <button  onClick={ () => this.handleDelete(product.id)}>Delete</button>    
                     </div> 
                     </div>
                     )
                     }
                
                     </div> 
           
                )} 
                   
                   
            </div>
            <div>
                    { this.state.productsList.length && <ProductCharts data={this.state.productsList}/>}
                    
                    </div>
            </div>
        )
    }

}

