import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"
import {colors} from "./lib/styles"

const Wrapper = styled.div`
  width: 320px;
  position: fixed;
  left: 0;
  top: 80px;
  background: rgba(49, 74, 164, 0.05);
  margin-right: 40px;
  height: 100%;
`

const SectionLabel = styled.div`
  height: 22px;
  padding-left: 40px;
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

const SecondarySectionLabel = styled.div`
  height: 22px;
  padding-left: 40px;
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

const GroupOption = styled.div `
  padding-left: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 20px;
  color: rgba(19, 23, 39, 0.6);
  transition: all 150ms cubic-bezier(0.21, 0.94, 0.64, 0.99);
  :hover {
    cursor: default;
    transform: scale(1.03);
    color: ${colors.blue};
  }
`

const JoinGroupOption = styled.div `
  padding-left: 40px;
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
  padding-left: 40px;
  padding-right: 40px;
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
  right: 45px;
  top: 5px;

`

const ArrowImage = styled.img`
  height: 14px;
  width: auto;
`


class groups extends Component {
  constructor (props){
    super(props);
    this.state = {
      groups: [],
      createGroupText: "",
    }
  }

  componentDidMount() {

  } 

  render () {
    for (let i = 0; i < this.state.groups.length; i++) {
      const group = this.state.groups[i]
      groups.push(
        <GroupOption>
          {group.content}
        </GroupOption>
      )
    }
    return (
      <Wrapper>
        <SectionLabel>Your Groups</SectionLabel>
        <GroupOption>General</GroupOption>
        <GroupOption>Computer Science @ Yale</GroupOption>

        <SecondarySectionLabel>Join Groups</SecondarySectionLabel>
        <JoinGroupOption>Econ @ Yale</JoinGroupOption>
        <JoinGroupOption>other fun group</JoinGroupOption>
        <JoinGroupOption>Skull & Bones??</JoinGroupOption>

        <SecondarySectionLabel>Create Group</SecondarySectionLabel>
        <NewGroup>
          <NewGroupInput onChange={event => {
            this.setState({createGroupText: event.target.value})
          }} placeholder="name"/>
          <NewGroupButton>
            <ArrowImage src={require("./assets/arrow.png")}/>
          </NewGroupButton>
        </NewGroup>
      </Wrapper>
    )
  }
}

export default groups