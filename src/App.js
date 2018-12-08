import React, {Component} from 'react';
import {createGroup, CreatePost, GetAllPosts, GetUsersPosts, Login, Logout, CreateProfile} from "./api"
import firebase from "firebase"
import styled from "styled-components"
import { colors } from "./lib/styles"
import Groups from "./Groups"
import Posts from "./Posts"


const Wrapper = styled.div`
  width: 100%;
  min-height: 800px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const CreatePostButton = styled.button`
  margin: 40px;
  font-size: 24px;
  padding: 10px;
`;

const LoginButton = styled.button`
  font-size: 20px;
  border: none;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  margin: 40px;
  font-size: 24px;
  padding: 10px;
`;

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const ContentInput = styled.textarea`
  padding: 0.5em;
  margin: 0.5em;
  width:500px;
  height:300px;
  color: ${props => props.inputColor || "palevioletred"};
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const Header = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  box-sizing: border-box;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 40px;
  padding-right: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-shadow: rgba(19, 23, 39, 0.1) 0px 4px 10px 0px;
`

const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`

const RightHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.nearBlack};
`

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.gray};
  margin-left: 10px;
`

const GoogleImage = styled.img`
  height: 30px;
  width: auto;
  margin-top: 5px;
`

const Body = styled.div`
  padding-top: 100px;
  display: flex;
  flex-direction: row;
  width: 100%;
`


class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            uid: null,
            activeGroup: null
        };
        this.updateActiveGroup = this.updateActiveGroup.bind(this);
    }

    updateActiveGroup(groupId) {
      this.setState({activeGroup: groupId})
    }

    render() {
      console.log(this.state)
        return (
          <Wrapper>
            <Body>
              <Groups uid={this.state.uid} updateActiveGroup={this.updateActiveGroup}/>
              <Posts uid={this.state.uid} activeGroup={this.state.activeGroup}/>
            </Body>
            <Header>
              <LeftHeader>
                <Title>bulluber</Title>
                <SubTitle>community talk.</SubTitle>
              </LeftHeader>
              <RightHeader>
                <LoginButton 
                  value="Submit" onClick={() => {
                    if (this.state.uid) {
                      Logout().then(() => {
                        this.setState({uid: null})
                      }).catch(error => {
                        alert("An error occurred while logging out")
                      })
                    }
                    else {
                      Login().then(uid => {
                        this.setState({uid})
                      }).catch(error => {
                        alert("An error occurred while logging in")
                      })
                    }
                  }}>
                    {this.state.uid && "logout"}
                    {!this.state.uid && (
                      <GoogleImage src={require("./assets/google.png")}/>
                    )}
                </LoginButton>
              </RightHeader>
            </Header>
          </Wrapper>
        );
    }
}


export default App;
