// Composição

var Page = React.createClass({
	displayName: "Page",
	// Ao consumir uma API REST tem que declarar o array antes
	getInitialState: function () {
		return { data: [
				// {id:"1", name:"Rafael", email:"rafazeon@gmail.com", subject:"R", messenger:"Contato"},
				// {id:"2", name:"Pedro", email:"pedro@gmail.com", subject:"A", messenger:"Contato"}
			] };
	},

	handleContactSubmit: function (contact) {
		// Ao dar submit no form salva os dados
		console.log(contact);
		var newContacts = this.state.data.concat([contact]); // Lista concatenada
		this.setState({ data: newContacts }); // data recebe a nova lista de contatos
	},

	componentDidMount() {
		fetch('https://facebook.github.io/react-native/movies.json').then(Response => Response.json()).then(findresponse => {
			this.setState({
				data: findresponse.movies // Recupera os filmes apenas
			});
		});
	},

	render: function () {
		return (// Componente que reutiliza outros componentes dentro
			React.createElement(
				"myElement",
				null,
				React.createElement(Nav, { title: "React", linkUrl: "index.html" }),
				React.createElement(
					"div",
					{ className: "container" },
					React.createElement(
						Title,
						null,
						"My component title!"
					),
					React.createElement(Form, { onContactSubmit: this.handleContactSubmit, idNumber: this.state.data.length + 1 }),
					React.createElement(
						"div",
						{ className: "row" },
						React.createElement(List, { data: this.state.data })
					)
				)
			)
		);
	}
});

// Recupero a data na lista pela função do state retornando o array data

// Para acessar um atributo de estado utilizar o this.state

// idNumber={this.state.data.length + 1} envia o próximo ID

// Para acessar o props utiliza this.props.title (exemplo)

// Para acessar o children conteúdo do meio do componente usa this.props.children

ReactDOM.render(React.createElement(Page, null), document.getElementById('page') // Vira o ID referente aos componentes da composição
);