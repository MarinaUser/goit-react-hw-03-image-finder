import { Component } from 'react';
import * as API from './services/api';
import { toast } from 'react-toastify';

import Searchbar from './Searchbar';
import { Container } from './App.styled';
import ImageGallery from './ImageGallery';


export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
   
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const response = await API.fetchImages(query.toLowerCase(), page);

      if (page === 1) {
        this.setState(prevState => ({
          items: [...response],
        }));
      } else {
        this.setState(prevState => ({
          items: [...prevState.items, ...response],
        }));
      }

      if (response.length === 0) {
        return toast.warn(
          'Search Failure. There is no images for your query. Please enter other query.'
        );
      }
    } catch {
      const message = 'Oops, something went wrong ...';
      this.setState({ error: message });
    } finally {
      this.setState({ isLoading: false });
    }
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
    const { items, isLoading, error } = this.state;
    const { handleSearchbarSubmit } = this;

    return (
      <Container>
        <Searchbar onSubmit={handleSearchbarSubmit} />
        
            
            <ImageGallery images={items} />
                  
      </Container>
    );
  }
}
