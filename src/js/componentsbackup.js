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
      return {name:'', email:'', subject:'R', messenger:''} // Função ao alterar o valor do campo ele gera uma ação
  },

  handleNameChange: function(e){
      this.setState({name: e.target.value}); // Pega o valor do Input
  },

  handleEmailChange: function(e){
      this.setState({email: e.target.value});
  },

  handleSubjectChange: function(e){
      this.setState({subject: e.target.value});
  },

  handleMessengerChange: function(e){
      this.setState({messenger: e.target.value});
  },

  handleSubmit: function(e) {
      e.preventDefault(); // Para pegar a ação do submit
      var name = this.state.name.trim(); // Para obter os valores dos atributos de state acima
      var email = this.state.email.trim();
      var subject = this.state.subject;
      var messenger = this.state.messenger.trim();

      if(!name || !email || !subject || !messenger) {
        return;
      }

      this.props.onContactSubmit({id: this.props.idNumber, name: name, email: email, subject: subject, messenger: messenger});
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
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" onChange={this.handleNameChange} style={InputStyle} placeholder="Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" className="form-control" onChange={this.handleEmailChange} style={InputStyle} placeholder="Email"/>
            </div>
            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select defaultValue={this.state.subject} className="form-control" onChange={this.handleSubjectChange}>
                    <option value="A">Angular JS</option>
                    <option value="J">Jquery</option>
                    <option value="R">React</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="messenger">Messenger</label>
                <textarea className="form-control" onChange={this.handleMessengerChange} style={InputStyle} rows="3"></textarea>
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
          <th scope="row">{this.props.idNumber}</th>
          <td>{this.props.name}</td>
          <td>{this.props.email}</td>
          <td>{this.props.subject}</td>
          <td>{this.props.children}</td>
        </tr>
      );
    }
});

var List = React.createClass({
    render:function(){
      var ContactNodes = this.props.data.map(function(contact){ // Com o map percorre cada linha do data array
        return (
          <Contact idNumber={contact.id} name={contact.name} email={contact.email} // Utilizo o componente Contact dentro de List
          subject={contact.subject}>
            {contact.messenger}
          </Contact> //Children declarado no meio do contact
        );
      });
      return(
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>

          <tbody>
              {ContactNodes}
          </tbody>

        </table>
      );
    }
});
