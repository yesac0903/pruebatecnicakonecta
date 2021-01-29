import React from 'react';
import '../assetss/css/LoginAdmin.css';
import {Apiurl} from '../services/apirest';
import axios from 'axios';

class LoginAdmin extends React.Component{

			constructor(props){
				super(props);
			}

			manejadorSubmit(e){
				e.preventDefault();
			}

			state={
			  form:{
			      "Usuario":"",
			      "Password":""
			  },
			  error:false,
			  errorMsg:""
			}

			manejadorChange = async e=>{
			    await this.setState({

			      form:{
                     ...this.state.form,
                     [e.target.name]:e.target.value 
			      }
			    })
			    
			}

			manejadorBoton1=()=>{
			   let url= Apiurl + "auth";
			   axios.post(url,this.state.form)
			   .then( response =>{
			         if(response.data.status === "ok"){

			         localStorage.setItem("token",response.data.result.token);
			         this.props.history.push("/PaginaAdmin");


			         }else{
			            this.setState({
			              error : true,
			              errorMsg : response.data.result.error_msg
			            })
			         }
			   })
			}

	render(){
	     return(
	     <React.Fragment>
					<div className="sidenav">
					         <div className="login-main-text">
					            <h2>Bienvenido</h2>
					            <p>Ingreso Administradores</p>
					            
					         </div>
					      </div>
					      <br></br><br></br>
					      <div className="main">
					       <div className="container">
					         <div className="col-md-6 col-sm-12">
					            <div>
					               <form onSubmit={this.manejadorSubmit}>
					                  <div className="form-group">
					                     <p>Ingresa con tu usuario y contraseña o registrate</p><br/>
					                     <label>Usuario</label>
					                     <input type="text" className="form-control" name="Usuario" placeholder="Usuario" onChange={this.manejadorChange}/>
					                  </div>
					                  <div className="form-group">
					                     <label>Contraseña</label>
					                     <input type="password" class="form-control" name="Password" placeholder="Password" onChange={this.manejadorChange}/>
					                  </div>
					                  <button type="submit" class="btn btn-black" onClick={this.manejadorBoton1}>Login</button>
					                 
											{this.state.error === true &&
											<div className="alert alert-danger" role="alert">
											    {this.state.errorMsg}
											</div>
 												}
		
					               </form>
					            </div>
					           </div>
					         </div>
					      </div>

	     </React.Fragment>
	     );
	}
}

export default LoginAdmin