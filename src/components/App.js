import React, { Component } from 'react';
import axios from 'axios'
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      userInput: ''
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    // this.searchBar = this.searchBar.bind(this);
  }

  componentDidMount() {
    axios.get(`https://practiceapi.devmountain.com/api/posts`)
      .then((response) => {
        this.setState({
          posts: response.data
        })
        console.log(response)
      })
      .catch((error) => {
        console.log('Error obtaining post data')
      })
  }

  // searchBar(searchText) {

  //   axios.get(`https://practiceapi.devmountain.com/api/posts`)
  //     .then((response) => {
  //       response.data.filter(e => e.includes(encodeURI(searchText)))
  //       })
  // }

  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then((response) => {
        this.setState({
          posts: response.data
        })
      })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, { text })
      .then(response => {
        this.setState({
          posts: response.data
        })
      })
  }

  render() {

    const { posts } = this.state;
    return (
      <div className="App__parent">
        <Header 
          typeSearch={this.handleChange}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost} />
          {posts.map(e => (
            <Post
              key={e.id}
              text={e.text}
              date={e.date}
              id={e.id}
              updatePostFn={this.updatePost}
              deletePostFn={this.deletePost}
            />
          ))}

        </section>
      </div>
    );
  }
}

export default App;
