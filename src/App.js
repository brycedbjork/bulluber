import React, {Component} from 'react';
import {CreatePost, Login, Logout} from "./api"
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
            content:"",
            group:""
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
            console.log(that.state.currentUserUID);
        }).catch(function (error) {
            alert(error.message);
        });

    };

    handleLogout = () => {
        alert("Logging out!");
        Logout();
    };


    render() {
        return (
            <div className="Login">
                <Wrapper>

                    <CreatePostButton value="Submit" onClick={() => {
                        {
                            this.handleLogin();
                        }
                    }}>
                        Login with Google
                    </CreatePostButton>

                    <CreatePostButton value="Submit" onClick={() => {
                        {
                            this.handleLogout()
                        }
                    }}>
                        Logout
                    </CreatePostButton>


                    <form onSubmit={this.handleSubmit}>
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
                        <br></br>
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
                        CreatePost(this.state.currentUserUID, "test group id", this.state.content)
                    }}>
                        Create Post!
                    </CreatePostButton>
                </Wrapper>
            </div>


        );
    }
}

export default App;
