import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"
import {colors} from "./lib/styles"

const Wrapper = styled.div`
  flex: 1;
`

const Post = styled.div`
  
`

const CreatePost = styled.div`
  width: 400px;
  height: 200px;
  position: relative;
`

const CreatePostInput = styled.textarea`
  resize: none;
  width: 400px;
  height: 200px;
  outline: none;
  border-radius: 10px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 600;
  padding: 20px;
  padding-bottom: 60px;
  box-sizing: border-box;
  border: 1px solid rgba(19, 23, 39, 0.1);
`

const Footer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
`

const FooterText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.gray};
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
  border-radius: 10px;
`

const PostArrow = styled.img`
  height: 12px;
  width: auto;
  margin-left: 10px;
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
            <FooterText>in Group Name</FooterText>
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