import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"
import {colors} from "./lib/styles"

const Wrapper = styled.div`

`

const Post = styled.div`
  
`

const CreatePost = styled.div`
  width: 300px;
  height: 200px;
  position: relative;
`

const CreatePostInput = styled.input`
  width: 300px;
  height: 200px;
  outline: none;
`

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
`

const PostButton = styled.div`
  padding: 10px 20px 10px 20px;
  background-color: ${colors.blue};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 18px;
  border-radius: 5px;
`

const PostArrow = styled.img`
  height: 12px;
  width: auto;
`

class Posts extends Component {
  constructor (props){
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    
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
        <CreatePost>
          <CreatePostInput placeholder="what's up? let's talk"/>
          <Footer>
            <PostButton>
              Post
              <PostArrow src={require("./assets/arrow.png")}/>
            </PostButton>
          </Footer>
        </CreatePost>
        {posts}
      </Wrapper>
    )
  }
}

export default Posts