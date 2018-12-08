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

`


class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUserUID: null,
            activeGroup: null,
            isLoggedIn: false
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.updateActiveGroup = this.updateActiveGroup.bind(this);
    }

    updateActiveGroup(groupId) {
      this.setState({activeGroup: groupId})
    }

    handleLogin = () => {
        let uid = -1;
        let name = "";
        var that = this;
        Login().then(function (result) {
            uid = result.user.uid;
            name = result.user.displayName;
            console.log(result)
            that.setState({currentUserUID: uid, isLoggedIn: true});
            // CreateProfile(that.state.currentUserUID, name)
        }).catch(function (error) {
            alert(error.message);
        });

    };

    handleLogout = () => {
        Logout()
        this.setState({isLoggedIn: false})
        console.log("logout is: ", this.state.isLoggedIn)
    };


    handleGetUsersPosts = () => {
        GetUsersPosts().then(function(snap){
                snap.forEach(function(post){
                    console.log(post.id,"=>",post.data())
                })
    })};


    handleGetAllPosts = () => {
        GetAllPosts().then(function(snap){
            snap.forEach(function(post){
                console.log(post.id,"=>",post.data())
                return(
                  <div>I LOVE BUBBLES</div>
                  )
            })
        })};

    //
    // handleMessagesDisplay = () => {
    //     var userId = firebase.auth().currentUser.uid;
    //     let firestore = firebase.firestore();
    //     console.log(firestore.collection('posts/').where("userId", "==",userId).get().then(function(snap){
    //         snap.forEach(function(post){
    //             console.log(post.id,"=>",post.data())
    //         })
    //     }))
    // };

    render() {
        return (
          <Wrapper>
            <Header>
              <LeftHeader>
                <Title>bulluber</Title>
                <SubTitle>community talk.</SubTitle>
              </LeftHeader>
              <RightHeader>
                <LoginButton 
                  value="Submit" onClick={() => {
                    if (this.state.isLoggedIn) {
                      this.handleLogout()
                    }
                    else {
                      this.handleLogin()
                    }
                  }}>
                    {this.state.isLoggedIn && "logout"}
                    {!this.state.isLoggedIn && (
                      <GoogleImage src={require("./assets/google.png")}/>
                    )}
                </LoginButton>
              </RightHeader>
            </Header>
            <Body>
              <Groups updateActiveGroup={this.updateActiveGroup}/>
              <Posts/>
            </Body>

          </Wrapper>
        );
    }
}


export default App;
