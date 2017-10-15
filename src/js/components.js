// Organizando os componentes

var Nav = React.createClass({
		render: function() {
      var NavStyle = {
        marginLeft:"20%"
      };
			return( // componente vai dentro, Para adicionar as classes className
				<nav className="navbar navbar-default">
						<div style={NavStyle} className="navbar-header">
								<a href={this.props.linkUrl} className="navbar-brand">
										{this.props.title}
								</a>
						</div>
				</nav>
			);
		}
});

var Title = React.createClass({

		render: function() {
      var TitleStyle = { // Para declarar o CSS
        color: "blue",
        fontSize: "35px"
      };
			return( // JSX
				<div className="container">
						<div className="row">
								<h1 style={TitleStyle}>{this.props.children}</h1>
						</div>
				</div>

			);
		}
});

var Button = React.createClass({

		getInitialState: function(){ // Padrão React, Inicializa os componentes
			return {
				click:false
			};
		},

		toggleClick: function(){
			this.setState({
				click: !this.state.click // Se for false vira true, ou o inverso
			});
		},

		render: function() {
			var btnClass = this.state.click ? 'btn btn-warning' : 'btn btn-success';
			var title = this.state.click ? this.props.textActive : this.props.children;
			return(
				<button onClick={ this.toggleClick } className={ btnClass }>{ title }</button>
			);
		}
});

var Form = React.createClass({
  getInitialState: function() {
      return {title:'', releaseYear:''} // Função ao alterar o valor do campo ele gera uma ação
  },

  handleTitleChange: function(e){
      this.setState({title: e.target.value}); // Pega o valor do Input
  },

  handleReleaseYearChange: function(e){
      this.setState({releaseYear: e.target.value});
  },


  handleSubmit: function(e) {
      e.preventDefault(); // Para pegar a ação do submit
      var title = this.state.title.trim(); // Para obter os valores dos atributos de state acima
      var releaseYear = this.state.releaseYear.trim();

      if(!title || !releaseYear) {
        return;
      }

      this.props.onContactSubmit({id: this.props.idNumber, title: title, releaseYear: releaseYear});
  },


  render:function(){
    var InputStyle={
      padding:"20px",
      fontSize:"16px",
      color:"#eee"
    };
    return (
        <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Movie</label>
                <input type="text" className="form-control" onChange={this.handleTitleChange} style={InputStyle} placeholder="Movie"/>
            </div>
            <div className="form-group">
                <label htmlFor="releaseYear">Year</label>
                <input type="text" className="form-control" onChange={this.handleReleaseYearChange} style={InputStyle} placeholder="Year"/>
            </div>

            <Button textActive="Loading..">Send</Button>
        </form>
    );
  }
});

// this.state.subject para pegar o valor do defaultvalue R

var Contact = React.createClass({ // Define os props utilizando o componente Contact
    render:function(){
      return (
        <tr>
          <th scope="row">{this.props.title}</th>
          <td>{this.props.releaseYear}</td>
        </tr>
      );
    }
});

var List = React.createClass({
    render:function(){
      var ContactNodes = this.props.data.map(function(contact){ // Com o map percorre cada linha do data array
				console.log(contact);
        return (
          <Contact title={contact.title} releaseYear={contact.releaseYear}>
          </Contact> //Children declarado no meio do contact
        );
      });
      return(
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>ReleaseYear</th>
            </tr>
          </thead>

          <tbody>
              {ContactNodes}
          </tbody>

        </table>
      );
    }
});
