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
    return { title: '', releaseYear: '' // Função ao alterar o valor do campo ele gera uma ação
    };
  },

  handleTitleChange: function (e) {
    this.setState({ title: e.target.value }); // Pega o valor do Input
  },

  handleReleaseYearChange: function (e) {
    this.setState({ releaseYear: e.target.value });
  },

  handleSubmit: function (e) {
    e.preventDefault(); // Para pegar a ação do submit
    var title = this.state.title.trim(); // Para obter os valores dos atributos de state acima
    var releaseYear = this.state.releaseYear.trim();

    if (!title || !releaseYear) {
      return;
    }

    this.props.onContactSubmit({ id: this.props.idNumber, title: title, releaseYear: releaseYear });
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
          "Movie"
        ),
        React.createElement("input", { type: "text", className: "form-control", onChange: this.handleTitleChange, style: InputStyle, placeholder: "Movie" })
      ),
      React.createElement(
        "div",
        { className: "form-group" },
        React.createElement(
          "label",
          { htmlFor: "releaseYear" },
          "Year"
        ),
        React.createElement("input", { type: "text", className: "form-control", onChange: this.handleReleaseYearChange, style: InputStyle, placeholder: "Year" })
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
        this.props.title
      ),
      React.createElement(
        "td",
        null,
        this.props.releaseYear
      )
    );
  }
});

var List = React.createClass({
  displayName: "List",

  render: function () {
    var ContactNodes = this.props.data.map(function (contact) {
      // Com o map percorre cada linha do data array
      console.log(contact);
      return React.createElement(Contact, { title: contact.title, releaseYear: contact.releaseYear }) //Children declarado no meio do contact
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
            "Title"
          ),
          React.createElement(
            "th",
            null,
            "ReleaseYear"
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