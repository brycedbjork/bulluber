import React, {Component} from "react"
import firebase from "firebase"
import {CreateGroup} from "./api"

class Groups extends Component {
  constructor (props){
    super(props);
    this.state = {
      groups: [],
      createGroupName: "",
    }
    this.createGroup = this.createGroup.bind(this)
  }

  componentDidMount() {
    
  }

  createGroup() {
    if (this.state.createGroupName != "") {
      CreateGroup(this.state).then(groupId => {
        this.props.updateActiveGroup(groupId)
      }).catch(error => {
        alert("There was a problem with creating the group")
      })
    }
  }

  render () {
    return null
  }
}

export default Groups