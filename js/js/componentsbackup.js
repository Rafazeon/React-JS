// Organizando os componentes

var Nav = React.createClass({
  displayName: "Nav",

  render: function () {
    var NavStyle = {
      marginLeft: "20%"
    };
    return (// componente vai dentro, Para adicionar as classes className
      React.createElement(
        "nav",
        { className: "navbar navbar-default" },
        React.createElement(
          "div",
          { style: NavStyle, className: "navbar-header" },
          React.createElement(
            "a",
            { href: this.props.linkUrl, className: "navbar-brand" },
            this.props.title
          )
        )
      )
    );
  }
});

var Title = React.createClass({
  displayName: "Title",


  render: function () {
    var TitleStyle = { // Para declarar o CSS
      color: "blue",
      fontSize: "35px"
    };
    return (// JSX
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "div",
          { className: "row" },
          React.createElement(
            "h1",
            { style: TitleStyle },
            this.props.children
          )
        )
      )
    );
  }
});

var Button = React.createClass({
  displayName: "Button",


  getInitialState: function () {
    // Padrão React, Inicializa os componentes
    return {
      click: false
    };
  },

  toggleClick: function () {
    this.setState({
      click: !this.state.click // Se for false vira true, ou o inverso
    });
  },

  render: function () {
    var btnClass = this.state.click ? 'btn btn-warning' : 'btn btn-success';
    var title = this.state.click ? this.props.textActive : this.props.children;
    return React.createElement(
      "button",
      { onClick: this.toggleClick, className: btnClass },
      title
    );
  }
});

var Form = React.createClass({
  displayName: "Form",

  getInitialState: function () {
    return { name: '', email: '', subject: 'R', messenger: '' // Função ao alterar o valor do campo ele gera uma ação
    };
  },

  handleNameChange: function (e) {
    this.setState({ name: e.target.value }); // Pega o valor do Input
  },

  handleEmailChange: function (e) {
    this.setState({ email: e.target.value });
  },

  handleSubjectChange: function (e) {
    this.setState({ subject: e.target.value });
  },

  handleMessengerChange: function (e) {
    this.setState({ messenger: e.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault(); // Para pegar a ação do submit
    var name = this.state.name.trim(); // Para obter os valores dos atributos de state acima
    var email = this.state.email.trim();
    var subject = this.state.subject;
    var messenger = this.state.messenger.trim();

    if (!name || !email || !subject || !messenger) {
      return;
    }

    this.props.onContactSubmit({ id: this.props.idNumber, name: name, email: email, subject: subject, messenger: messenger });
  },

  render: function () {
    var InputStyle = {
      padding: "20px",
      fontSize: "16px",
      color: "#eee"
    };
    return React.createElement(
      "form",
      { onSubmit: this.handleSubmit },
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: "name" },
          "Name"
        ),
        React.createElement("input", { type: "text", className: "form-control", onChange: this.handleNameChange, style: InputStyle, placeholder: "Name" })
      ),
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: "email" },
          "Email"
        ),
        React.createElement("input", { type: "email", className: "form-control", onChange: this.handleEmailChange, style: InputStyle, placeholder: "Email" })
      ),
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: "subject" },
          "Subject"
        ),
        React.createElement(
          "select",
          { defaultValue: this.state.subject, className: "form-control", onChange: this.handleSubjectChange },
          React.createElement(
            "option",
            { value: "A" },
            "Angular JS"
          ),
          React.createElement(
            "option",
            { value: "J" },
            "Jquery"
          ),
          React.createElement(
            "option",
            { value: "R" },
            "React"
          )
        )
      ),
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: "messenger" },
          "Messenger"
        ),
        React.createElement("textarea", { className: "form-control", onChange: this.handleMessengerChange, style: InputStyle, rows: "3" })
      ),
      React.createElement(
        Button,
        { textActive: "Loading.." },
        "Send"
      )
    );
  }
});

// this.state.subject para pegar o valor do defaultvalue R

var Contact = React.createClass({
  displayName: "Contact",
  // Define os props utilizando o componente Contact
  render: function () {
    return React.createElement(
      "tr",
      null,
      React.createElement(
        "th",
        { scope: "row" },
        this.props.idNumber
      ),
      React.createElement(
        "td",
        null,
        this.props.name
      ),
      React.createElement(
        "td",
        null,
        this.props.email
      ),
      React.createElement(
        "td",
        null,
        this.props.subject
      ),
      React.createElement(
        "td",
        null,
        this.props.children
      )
    );
  }
});

var List = React.createClass({
  displayName: "List",

  render: function () {
    var ContactNodes = this.props.data.map(function (contact) {
      // Com o map percorre cada linha do data array
      return React.createElement(
        Contact,
        { idNumber: contact.id, name: contact.name, email: contact.email // Utilizo o componente Contact dentro de List
          , subject: contact.subject },
        contact.messenger
      ) //Children declarado no meio do contact
      ;
    });
    return React.createElement(
      "table",
      { className: "table" },
      React.createElement(
        "thead",
        null,
        React.createElement(
          "tr",
          null,
          React.createElement(
            "th",
            null,
            "Id"
          ),
          React.createElement(
            "th",
            null,
            "Name"
          ),
          React.createElement(
            "th",
            null,
            "Email"
          ),
          React.createElement(
            "th",
            null,
            "Subject"
          ),
          React.createElement(
            "th",
            null,
            "Message"
          )
        )
      ),
      React.createElement(
        "tbody",
        null,
        ContactNodes
      )
    );
  }
});