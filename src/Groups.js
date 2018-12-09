import React, {Component} from "react"
import firebase from "firebase"
import styled from "styled-components"
import {colors} from "./lib/styles"

const Wrapper = styled.div`
  width: 320px;
  background: rgba(49, 74, 164, 0.05);
  margin-right: 40px;
`

const YourGroups = styled.div`
  width: 100%;
  height: 22px;
  padding-left: 31px;
  padding-top: 17px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 16px;
  color: #131727;
`
const GroupType = styled.div `
  left: 31px;
  font-family: Avenir;
  padding-left: 31px; 
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  font-size: 20px;

  color: rgba(19, 23, 39, 0.3);
`



class groups extends Component {
  constructor (props){
    super(props);
    this.state = {
      groups: []
    }
  }

  componentDidMount() {
  } 

  render () {
    let groups = ["Yale things"]; 
    for (let i = 0; i < this.state.groups.length; i++) {
      const group = this.state.groups[i]
      groups.push(
        <GroupType>
          {group.content}
        </GroupType>
      )
    }
    return (
      <Wrapper>
        <YourGroups>Your Groups</YourGroups>
        <GroupType>{groups}</GroupType>
        <GroupType>{groups}</GroupType>
        <GroupType>{groups}</GroupType>
      </Wrapper>
    )
  }
}

export default groups