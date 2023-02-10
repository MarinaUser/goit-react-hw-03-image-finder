import React, { Component } from 'react';
import * as API from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import { Container } from './App.styled';


import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Notification from './Notification';
import Button from './Button';


export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
    error: null,
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

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  

  render() {
    const { items, error, isLoading } = this.state;
    const { handleSearchbarSubmit, loadMore } = this;

    return (
     <Container>
        <Searchbar onSubmit={handleSearchbarSubmit} />

        {error ? (
          <Notification message={error} />) : (
          <>
            {isLoading && <Loader />}
            {items.length > 0 && !isLoading && (
              <>
                <ImageGallery images={items}  />
                <Button onClick={loadMore} />
              </>
              )}
              
            <ToastContainer
              position="top-right"
              autoClose={3000}/>
          </>
        )}
      </Container>
    );
  }
}
