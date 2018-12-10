import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"
import {colors} from "./lib/styles"
import { CreateGroup, WatchUserGroups, WatchCommunityGroups, JoinGroup } from "./api"

const Wrapper = styled.div`
  width: 320px;
  position: fixed;
  left: 0;
  top: 80px;
  background: rgba(49, 74, 164, 0.05);
  margin-right: 40px;
  padding: 40px;
  height: 100%;
  box-sizing: border-box;
`

const SectionLabel = styled.div`
  height: 22px;
  padding-bottom: 30px;
  box-sizing: border-box;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 16px;
  color: #131727;
`

const SecondarySectionLabel = styled.div`
  height: 22px;
  padding-top: 40px;
  padding-bottom: 30px;
  box-sizing: border-box;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 16px;
  color: #131727;
`

const NotSignedInText = styled.p`
  font-weight: 700;
  line-height: normal;
  font-size: 20px;
`

const GroupOption = styled.div `
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 20px;
  color: ${props => props.active ? colors.blue : "rgba(19, 23, 39, 0.6)"};
  transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  :hover {
    cursor: default;
    transform: scale(1.03);
    color: ${colors.blue};
  }
`

const JoinGroupOption = styled.div `
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 20px;
  color: rgba(19, 23, 39, 0.3);
  transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  :hover {
    cursor: default;
    transform: scale(1.03);
    color: ${colors.blue};
  }
`

const NewGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`

const NewGroupInput = styled.input`
  padding: 10px;
  border: 1px solid rgba(19, 23, 39, 0.1);
  font-size: 20px;
  border-radius: 10px;
  background-color: transparent;
  outline: none;
  width: 100%;
  font-weight: 500;
  padding-right: 55px;
`

const NewGroupButton = styled.div`
  background-color: ${colors.blue};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
  transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  :hover {
    cursor: default;
    transform: scale(1.1);
    color: ${colors.blue};
  }
  border-radius: 10px;
  position: absolute;
  right: 5px;
  top: 5px;

`

const ArrowImage = styled.img`
  height: 14px;
  width: auto;
`


class Groups extends Component {
  constructor (props){
    super(props);
    this.state = {
      userGroups: {},
      communityGroups: {},
      createGroupText: "",
    }
    this.handleCreateGroup = this.handleCreateGroup.bind(this)
    this.watchGroups = this.watchGroups.bind(this)
  }

  handleCreateGroup() {
    CreateGroup(this.state.createGroupText, this.props.user.community, this.props.user.uid).then(groupId => {
      // successful group creation
      this.setState({createGroupText: ""})
    }).catch(error => {
      alert("Sorry, we couldn't create the group")
    })
  }

  watchGroups(uid, community) {
    WatchUserGroups(uid, (groupId, groupData) => {
      this.setState(prevState => {
        return {
          ...prevState,
          userGroups: {
            [groupId]: groupData,
            ...prevState.userGroups
          }
        }
      })
    }, error => {
      alert("An error occurred: "+error)
    })

    WatchCommunityGroups(community, (groupId, groupData) => {
      this.setState(prevState => {
        return {
          ...prevState,
          communityGroups: {
            [groupId]: groupData,
            ...prevState.communityGroups
          }
        }
      })
    }, error => {
      alert("An error occurred: "+error)
    })
  }

  componentDidMount() {
    if (this.props.user.uid) {
      this.watchGroups(this.props.user.uid, this.props.user.community)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.uid) {
      this.watchGroups(nextProps.user.uid, nextProps.user.community)
    }
  }

  render () {
    let YourGroups = []
    for (let i = 0; i < Object.keys(this.state.userGroups).length; i++) {
      const groupId = Object.keys(this.state.userGroups)[i]
      const group = this.state.userGroups[groupId]
      YourGroups.push(
        <GroupOption 
          key={"groupOption"+groupId}
          active={this.props.activeGroup.id == groupId}
          onClick={() => this.props.updateActiveGroup(groupId, group.name)}>
          {group.name}
        </GroupOption>
      )
    }
    let OtherGroups = []
    for (let i = 0; i < Object.keys(this.state.communityGroups).length; i++) {
      const groupId = Object.keys(this.state.communityGroups)[i]
      const group = this.state.communityGroups[groupId]
      if (!this.state.userGroups[groupId]) {
        OtherGroups.push(
          <GroupOption
            key={"groupJoinOption"+groupId}
            onClick={() => {
              JoinGroup(groupId, this.props.user.uid).then(() => {
                // successfully joined group
              }).catch(error => {
                alert("Could not join group: "+error)
              })
            }}>
            {group.name}
          </GroupOption>
        )
      }
    }
    return (
      <Wrapper>
        <SectionLabel>Your Groups</SectionLabel>
        {this.props.user.uid && YourGroups}
        {!this.props.user.uid && <NotSignedInText>
          Sign in to view your groups
        </NotSignedInText>}

        {this.props.user.uid && OtherGroups.length > 0 && <SecondarySectionLabel>Join Groups</SecondarySectionLabel>}
        {this.props.user.uid && OtherGroups}

        {this.props.user.uid && <SecondarySectionLabel>Create Group</SecondarySectionLabel>}
        {this.props.user.uid && <NewGroup>
          <NewGroupInput onChange={event => {
            this.setState({createGroupText: event.target.value})
          }} placeholder="name" value={this.state.createGroupText}/>
          <NewGroupButton onClick={this.handleCreateGroup}>
            <ArrowImage src={require("./assets/arrow.png")}/>
          </NewGroupButton>
        </NewGroup>}
      </Wrapper>
    )
  }
}

export default Groups