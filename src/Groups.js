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
  }

  componentDidMount() {
    
  }

  render () {
    return null
  }
}

export default Groups