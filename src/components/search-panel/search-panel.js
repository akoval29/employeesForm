import { Component } from "react";
import "./search-panel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
    };
  }

  onUpdateSearch = (e) => {
    // функція із search-panel
    const term = e.target.value;
    this.setState({ term });
    this.props.onUpdateSearch(term); // а це зовсім інша функція в app.js
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Знайти співробітника"
        value={this.state.term}
        onChange={this.onUpdateSearch}
      /> // передаєму цю "зовсім іншу функцію" наверх в app.js
    );
  }
}

export default SearchPanel;
