import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"

const Wrapper = styled.div`
   
`

const Post = styled.div`
  
`

class Posts extends Component {
  constructor (props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    var firebaseUser = firebase.auth().currentUser
    if (firebaseUser) {
      let userId = firebaseUser.uid
      let firestore = firebase.firestore();
      let currentPosts = this.state.posts
      firestore.collection('posts').where("userId", "==", userId).get().then(snap => {
        let posts = []
        snap.forEach(post =>{
            posts.push({
              id: post.id,
              ...post.data()
            });
        })
        this.setState({posts})
      })
    }
  } 

  render () {
    let posts = []
    for (let i = 0; i < this.state.posts.length; i++) {
      const post = this.state.posts[i]
      posts.push(
        <Post>
          {post.content}
        </Post>
      )
    }

    return (
      <Wrapper>
        {posts}
      </Wrapper>
    )
  }
}

export default Posts