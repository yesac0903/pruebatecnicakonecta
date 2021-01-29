import React from 'react';
import '../assetss/css/Login.css';
import {Apiurl} from '../services/apirest';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class Login extends React.Component{
  constructor(props){
	super(props);
	}

manejadorSubmit(e){
 e.preventDefault();
			}

			state={
			  form:{
			      "Usuario":"",
			      "Password":"",
			      "Nombre":"",
			      "NumeroMovil":"",


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
			       this.props.history.push("/Dashboard");
                  }else{
			            this.setState({
			              error : true,
			              errorMsg : response.data.result.error_msg
			            })
			         }
			   })
			}

			peticionGet=()=>{
			       let url = Apiurl + "usuarios?page=1";
					axios.get(url).then(response=>{
					this.setState({data: response.data});
					}).catch(error=>{
					console.log(error.message);
					})
					}	

			peticionPost=async()=>{
		     let url = Apiurl + "usuarios?page=1";
		     await axios.post(url,this.state.form).then(response=>{
				    this.modalInsertar();
				    this.peticionGet();
				  }).catch(error=>{
				    console.log(error.message);
				  })
				}	

					handleChange=async e=>{
						e.persist();
						await this.setState({
						  form:{
						   ...this.state.form,
						   [e.target.name]: e.target.value
						  }
						});
						console.log(this.state.form);
						}

		   componentDidMount(){
	       this.peticionGet();
			         }

			modalInsertar=()=>{
		     this.setState({modalInsertar: !this.state.modalInsertar});
		    }

			manejadorBoton3=()=>{
			    this.props.history.push("/LoginAdmin");
			}
	
render(){
  const {form}=this.state;
   return(
	     <React.Fragment>
					<div className="sidenav">
					         <div className="login-main-text">
					            <h2>Bienvenidos<br/>Blog prueba Konecta</h2>
					            <p>Ingreso Administradores</p>
					            <button type="submit" class="btn btn-secondary"onClick={this.manejadorBoton3} >Administrador</button>
					         </div>
					      </div>
					       <br></br><br></br>
					      <div className="main">
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
					                  <button type="submit" class="btn btn-secondary" onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}} >Registro</button><br/>

											{this.state.error === true &&
											<div className="alert alert-danger" role="alert">
											    {this.state.errorMsg}
											</div>
 												}
					                 


					               </form>
					            </div>
					         </div>
					      </div>


			<Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{display: 'block'}}>
                  <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
                </ModalHeader>
                <ModalBody>
                  <div className="form-group">
                   
                    <label htmlFor="CorreoElectronico">Correo Electronico (usuario)</label>
                    <input className="form-control" type="text" name="CorreoElectronico" id="CorreoElectronico" onChange={this.handleChange} value={form?form.CorreoElectronico: ''}/>
                    <br />
                    <label htmlFor="Nombre">Nombre Completo</label>
                    <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form?form.Nombre: ''}/>
                    <br />
                    <label htmlFor="Password">Contraseña</label>
                    <input className="form-control" type="password" name="Password" id="Password" onChange={this.handleChange} value={form?form.Password:''}/>
                    <label htmlFor="NumeroMovil">Telefono Movil</label>
                     <input className="form-control" type="text" name="NumeroMovil" id="NumeroMovil" onChange={this.handleChange} value={form?form.NumeroMovil:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Crear Usuario
                  </button>
                    
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>

	     </React.Fragment>
	     );
	}
}



export default Login