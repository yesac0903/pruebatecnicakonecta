import React from 'react';
import Header from '../template/Header';
import '../assetss/css/Dashboard.css';
import {Apiurl} from '../services/apirest';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class Dashboard extends React.Component{

  state={	
   data:[],
   modalInsertar: false,
		   form:{
		    Titulo: '',
		    TextoCorto: '',
		    TextoLargo: '',
		    IdCategoria: '',
		    tipoModal: ''
		     }
	 }

	 modalInsertar=()=>{
     this.setState({modalInsertar: !this.state.modalInsertar});
    }

    peticionGet=()=>{
       let url = Apiurl + "articulos?page=1";
		axios.get(url).then(response=>{
		this.setState({data: response.data});
		}).catch(error=>{
		console.log(error.message);
		})
		}	  


	peticionPost=async()=>{
		  let url = Apiurl + "articulos?page=1";
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
					            <h2>Escribe un articulo</h2>
					            <p>Ingresa un articulo, que esperas!</p>
					            <button type="submit" class="btn btn-secondary"  onClick={()=>{this.setState({form: null, tipoModal: 'insertar'}); this.modalInsertar()}}>Escribir</button>
					         </div>
					      </div>
       <div className="main">
	     <div className="container">
	     <center><h1>Lista de articulos</h1></center>
	       { this.state.data.map(articulos =>{
			return(
                    <div class="card">
					<div class="card-header">
					{articulos.Titulo}
					</div>
					<div class="card-body">
					<h5 class="card-title">{articulos.TextoCorto}</h5>
                    <p>{articulos.TextoLargo}</p>
					
				    </div>
					</div>
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
                   
                    <label htmlFor="Titulo">Titulo</label>
                    <input className="form-control" type="text" name="Titulo" id="Titulo" onChange={this.handleChange} value={form?form.Titulo: ''}/>
                    <br />
                    <label htmlFor="TextoCorto">Descripción</label>
                    <input className="form-control" type="text" name="TextoCorto" id="TextoCorto" onChange={this.handleChange} value={form?form.TextoCorto: ''}/>
                    <br />
                    <label htmlFor="TextoLargo">Escribe</label>
                    <input className="form-control" type="text" name="TextoLargo" id="TextoLargo" onChange={this.handleChange} value={form?form.TextoLargo:''}/>
                    <label htmlFor="IdCategoria">Escribe categoria:<br/>1-Musica; 2-Deportes; 3-Variado</label>
                     <input className="form-control" type="text" name="IdCategoria" id="IdCategoria" onChange={this.handleChange} value={form?form.IdCategoria:''}/>
                  </div>
                </ModalBody>

                <ModalFooter>
                  
                    <button className="btn btn-success" onClick={()=>this.peticionPost()}>
                    Insertar
                  </button>
                    
                    <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
          </Modal>

	     
	     </React.Fragment>

	     )
	};
};


export default Dashboard