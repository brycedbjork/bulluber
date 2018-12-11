import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"
import {colors} from "./lib/styles"
import { CreatePost, WatchGroupPosts, ToggleLikePost, GetInitials, WatchUserIDs } from "./api"

const Wrapper = styled.div`
  padding: 40px;
  flex: 1;
  box-sizing: border-box;
  padding-left: 360px;
  position: relative;
`

const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${colors.nearBlack};
  margin-bottom: 40px;
`

const CreatePostWrapper = styled.div`
  width: 500px;
  height: 200px;
  position: relative;
  margin-bottom: 40px;
`

const CreatePostText = styled.textarea`
  resize: none;
  width: 500px;
  height: 200px;
  outline: none;
  border-radius: 10px;
  font-size: 20px;
  line-height: 24px;
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
  align-items: flex-end;
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
  transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  :hover {
    cursor: default;
    transform: scale(1.05);
  }
`

const PostArrow = styled.img`
  height: 12px;
  width: auto;
  margin-left: 10px;
`

const PostWrapper = styled.div`
  width: 500px;
  box-sizing: border-box;
  padding: 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  min-height: 160px;
  border-radius: 10px;
  border: 1px solid rgba(19, 23, 39, 0.1);
  transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  :hover {
    cursor: default;
    transform: scale(1.03);
  }
` 

const PostContent = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: ${colors.nearBlack};
`

const HeartImage = styled.img`
  height: 16px;
  width: auto;
  margin-right: 5px;
`

const PostAuthor = styled.p`
  position: absolute;
  bottom: 20px;
  right: 20px;
  font-size: 16px;
  color: ${colors.gray};
`

const PostLikes = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`
  
const Post = ({content, likes, authorInitials, liked, onClick}) => {
  return (
    <PostWrapper onClick={onClick}>
      <PostContent>{content}</PostContent>
      <PostLikes>
        <HeartImage src={liked ? require("./assets/heart.png") : require("./assets/heartGray.png")}/>
        {likes}
      </PostLikes>
      <PostAuthor>-{authorInitials}</PostAuthor>
    </PostWrapper>
  )
}

class Posts extends Component {
  constructor (props){
    super(props);
    this.state = {
      posts: [],
      createPostText: "",
      initials: []
    }
    this.handlePost = this.handlePost.bind(this)
    this.watchPosts = this.watchPosts.bind(this)
    this.render = this.render.bind(this)
  }

  watchPosts(groupId) {
    WatchGroupPosts(groupId, posts => {
      this.setState({posts})
    }, error => {
      alert("Could not get posts: "+error)
    })
    WatchUserIDs(initials => {
      console.log("yo", initials)
      this.setState({initials})
    }, error => {
      alert("Could not get userIds: "+error)
    })
  }

  componentDidMount() {
    if (this.props.activeGroup.id) {
      this.watchPosts(this.props.activeGroup.id)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeGroup.id) {
      this.watchPosts(nextProps.activeGroup.id)
    }
  }


  handlePost() {
    if (this.props.user.uid && this.props.activeGroup.id) {
      if (this.state.createPostText != "") {
        CreatePost(this.props.user.uid, this.props.user.name, this.props.activeGroup.id, this.state.createPostText).then(() => {
          this.setState({createPostText: ""})
        }).catch(error => {
          alert("Could not post: "+error)
        })
      }
      else {
        alert("You cannot post a blank message")
      }
    }
    else {
      alert("You must be signed in to post")
    }
  }

  render () {
    let Posts = []
    console.log("hi", this.state.initials)
    for (let i = 0; i < this.state.posts.length; i++) {

      const post = this.state.posts[i]
      const output_initials = ""
      for (let j = 0; j < this.state.initials.length; j++) {
        if (this.state.initials[j].id == post.userId) {
          output_initials = this.state.initials[j].initials
          console.log("ini", output_initials)
          break
        }
      }
      console.log("post", post);
      Posts.push(
        <Post
          content={post.content}
          likes={post.likedBy.length}
          authorInitials={output_initials}
          liked={post.likedBy.includes(this.props.user.uid)}
          onClick={() => {
            ToggleLikePost(this.props.user.uid, post.id).then(() => {
              // done
            }).catch(error => {
              alert("could not like post")
              console.log(error)
            })
          }}/>
      )
    }

    return (
      <Wrapper>
        <Title>{this.props.activeGroup.name || "Sign in to start"}</Title>
        <CreatePostWrapper>
          <CreatePostText onChange={event => {
            this.setState({createPostText: event.target.value})
          }} placeholder="what's up? let's talk" value={this.state.createPostText}/>
          <Footer>
            <FooterText>in {this.props.activeGroup.name || "General"}</FooterText>
            <PostButton onClick={this.handlePost}>
              Post
              <PostArrow src={require("./assets/arrow.png")}/>
            </PostButton>
          </Footer>
        </CreatePostWrapper>
        {Posts}
      </Wrapper>
    )


  }
}

export default Posts