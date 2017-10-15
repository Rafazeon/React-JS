// Composição

var Page = React.createClass({ // Ao consumir uma API REST tem que declarar o array antes
	getInitialState: function(){
			return{data:
			[
				// {id:"1", name:"Rafael", email:"rafazeon@gmail.com", subject:"R", messenger:"Contato"},
				// {id:"2", name:"Pedro", email:"pedro@gmail.com", subject:"A", messenger:"Contato"}
			]}
	},

	handleContactSubmit:function(contact){ // Ao dar submit no form salva os dados
			console.log(contact);
			var newContacts = this.state.data.concat([contact]); // Lista concatenada
			this.setState({data:newContacts}); // data recebe a nova lista de contatos
	},

	componentDidMount()
	{
			fetch('https://facebook.github.io/react-native/movies.json').
			then((Response) => Response.json()).
			then((findresponse) => {
				this.setState({
					data:findresponse.movies, // Recupera os filmes apenas
				});
			});
	},

	render: function() {
		return( // Componente que reutiliza outros componentes dentro
			<myElement>
				<Nav title="React" linkUrl="index.html" />
				<div className="container">
					<Title>
						My component title!
					</Title>
					<Form onContactSubmit={this.handleContactSubmit} idNumber={this.state.data.length + 1} />
					<div className="row">
						<List data={this.state.data} />
					</div>
				</div>
			</myElement>
		);
	}
});

// Recupero a data na lista pela função do state retornando o array data

// Para acessar um atributo de estado utilizar o this.state

// idNumber={this.state.data.length + 1} envia o próximo ID

// Para acessar o props utiliza this.props.title (exemplo)

// Para acessar o children conteúdo do meio do componente usa this.props.children

ReactDOM.render(
	<Page />,
	document.getElementById('page') // Vira o ID referente aos componentes da composição
);
