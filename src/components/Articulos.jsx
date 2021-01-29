import React from 'react';
import Header from '../template/Header';
import {Apiurl} from '../services/apirest';
import axios from 'axios';

class Dashboard extends React.Component{

            state={			
			      articulos:[]
			     		  }

			  componentDidMount(){
                 let url = Apiurl + "articulos?page=1";
                 axios.get(url)
                 .then(response =>{
                    this.setState({
                    articulos : response.data
                    })
                 })
			    }
	
	render(){
	     return(
	     <React.Fragment>
	     <Header></Header> 
	     <div className="container">
	     <center><h1>Lista de articulos</h1></center>
	             { this.state.articulos.map((value,index) =>{
					     return(

		                      <div class="card">
								  <div class="card-header">
								    {value.Titulo}
								  </div>
								  <div class="card-body">
								    
								    <p>{value.TextoCorto}</p>
								    <a href="#" class="btn btn-primary">Leer</a>
								  </div>
								</div>
					     )
					  })}

	     </div>
	     </React.Fragment>

	     )
	};
};

export default Dashboard