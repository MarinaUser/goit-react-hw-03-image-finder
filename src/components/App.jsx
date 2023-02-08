import { Component } from 'react';
import Searchbar from './Searchbar';
import { Container } from './App.styled';


export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
  };

 
  handleSearchbarSubmit = query => {
    // console.log(query);
    // console.log(this.state);
    if (this.state.query.toLowerCase() !== query.toLowerCase()) {
      this.setState({ query, page: 1, items: [] });
    } else {
      this.setState({ page: 1 });
    }
  };

  

  render() {
    const { handleSearchbarSubmit } = this;

    return (
      <Container>
        <Searchbar onSubmit={handleSearchbarSubmit} />
      </Container>
    );
  }
}
