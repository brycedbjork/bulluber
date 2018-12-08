import React, {Component} from 'react';
import {CreatePost, Login, Logout} from "./api"
import firebase from "firebase"
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
`;

const CreatePostButton = styled.button`
  margin: 40px;
  font-size: 24px;
  padding: 10px;
`;

const LoginButton = styled.button`
  margin: 40px;
  font-size: 24px;
  padding: 10px;
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

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentUserUID: 0,
            content: "",

            group: "general"

            group: "",
            isLoggedIn: false

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleLogin = () => {
        let uid = -1;
        var that = this;
        Login().then(function (result) {
            uid = result.user.uid;
            that.setState({currentUserUID: uid});
        }).catch(function (error) {
            alert(error.message);
        });


        this.setState({currentUserUID: firebase.auth().currentUser.uid})
        alert(this.state.currentUserUID);

        this.setState({isLoggedIn: true}); 

    };

    handleLogout = () => {
        alert("Logging out!");
        Logout();
        this.setState({isLoggedIn: false}); 
        console.log("logout is: ", this.state.isLoggedIn);
    };

    handleMessagesDisplay = () => {
        var userId = firebase.auth().currentUser.uid;
        let firestore = firebase.firestore();
        console.log(firestore.collection('posts/').where("userId", "==",userId).get().then(function(snap){
            snap.forEach(function(post){
                console.log(post.id,"=>",post.data())
            })
        }))
    };

    render() {
      let button; 
      if (this.state.isLoggedIn == false) {
        button = <LoginButton 
                  value="Submit" onClick={() => {
                    {
                      this.handleLogin();
                    }
                  }}>
                    Login with Google
                  </LoginButton>
      } else {
        button = <LogoutButton 
                    value="Submit" onClick={() => {
                      {
                        this.handleLogout()
                      }
                    }}>
                      Logout
                    </LogoutButton>
      }
        return (
            <div className="Login">
                <Wrapper>
                    {button}
                    <form>
                        <label>
                            Group:
                            <Input
                                id="group"
                                type="text"
                                value={this.state.group}
                                onChange={this.handleChange}
                                defaultValue="Enter group name"
                                inputColor="blue"
                            />
                        </label>
                        <br/>
                        <label>
                            Message:
                            <ContentInput
                                id="content"
                                type="text"
                                value={this.state.content}
                                onChange={this.handleChange}
                                inputColor="blue"
                            />
                        </label>
                    </form>
                    <CreatePostButton onClick={() => {
                        CreatePost(this.state.currentUserUID, this.state.group, this.state.content)
                    }}>
                        Create Post!
                    </CreatePostButton>
                    <CreatePostButton onClick={() => {
                        this.handleMessagesDisplay(this.state.currentUserUID);
                    }}>
                        View posts
                    </CreatePostButton>
                </Wrapper>
            </div>
        );
    }
}

export default App;
