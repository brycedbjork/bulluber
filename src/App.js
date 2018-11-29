import React, { Component } from 'react';
import {CreatePost} from "./api"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  min-height: 800px;
  box-sizing: border-box;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CreatePostButton = styled.button`
  margin: 40px;
  font-size: 24px;
  padding: 10px;
`

class App extends Component {

  render() {
    return (
      <Wrapper>
        <CreatePostButton onClick={() => {
          CreatePost("test user id", "test group id", "test content")
        }}>
          Create Post!
        </CreatePostButton>
      </Wrapper>
    );
  }
}

export default App;
