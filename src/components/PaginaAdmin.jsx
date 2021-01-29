import React from 'react';
import Header from '../template/Header';
import '../assetss/css/Dashboard.css';
import {Apiurl} from '../services/apirest';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class PaginaAdmin extends React.Component{

  state={	
   data:[],
   modalInsertar: false,
		   form:{
		    Nombre: '',
		    CorreoElectronico: '',
		    NumeroMovil: '',
		    Estado: '',
		    IdUsuario: '',
		    Password:'',
		    tipoModal:'',
		    token:''
		     }
	 }

	 seleccionarUsuario=(Usuario)=>{
		  this.setState({
		    tipoModal: 'actualizar',
		    form: {
		      IdUsuario: Usuario.IdUsuario,
		      Nombre: Usuario.Nombre,
		      CorreoElectronico: Usuario.CorreoElectronico,
		      Password: Usuario.Password
    }
  })
}


peticionPut=()=>{
  let url = Apiurl + "usuarios?page=1";
  axios.put(url+this.state.form.IdUsuario, this.state.form.token).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  })
}

peticionDelete=()=>{
   let url = Apiurl + "usuarios?page=1";
  axios.delete(url+this.state.form.id).then(response=>{
    this.setState({modalEliminar: false});
    this.peticionGet();
  })
}

	 modalInsertar=()=>{
     this.setState({modalInsertar: !this.state.modalInsertar});
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



render(){
 const {form}=this.state;
  return(
	     <React.Fragment>

	       <div className="sidenav">
					         <div className="login-main-text">
					            <h2>Listado de usuarios</h2>
					            <p>Ingresa un usuario nuevo<br/>Si deseas modificar los datos de un usuario, click en el Nombre</p><br/>
					            <button type="submit" class="btn btn-secondary"  onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Usuario Nuevo</button>

					         </div>
					      </div>
       <div className="main">
	     <div className="container">
	     <center><h1>Lista de Usuarios</h1></center>
	       { this.state.data.map(Usuario =>{
			return(
                    <table class="table table-hover table-dark">
						  <thead>
						    <tr>
						      <th scope="col">Nombre</th>
						      <th scope="col">Correo</th>
						      <th scope="col">Telefono Movilt</th>
						      <th scope="col">Estado</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr onClick={()=>{this.seleccionarUsuario(Usuario); this.modalInsertar()}}>
						      <td>{Usuario.Nombre}</td>
						      <td>{Usuario.CorreoElectronico}</td>
						      <td>{Usuario.NumeroMovil}</td>
						      <td>{Usuario.Estado}</td>
						    </tr>
						  </tbody>
						</table>
				  )
		    })}

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
                  
                     {this.state.tipoModal=='insertar'?
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
                    Actualizar
                  </button>
  }
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>

	     
	     </React.Fragment>

	     )
	};
};


export default PaginaAdmin