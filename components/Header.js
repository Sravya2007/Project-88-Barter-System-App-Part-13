import React, { Component } from 'react';
import { Header, Icon, Badge } from 'react-native-elements';
import { View, Text, StyeSheet ,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class MyHeader extends Component{
    constructor(props){
      super(props)
      this.state={
        userId: firebase.auth().currentUser.email,
        value:""
      }
    }
  
  getNumberOfUnreadNotifications(){
    db.collection('all_notifications').where('notification_status','==',"unread").where('targeted_user_id','==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var unreadNotifications = snapshot.docs.map((doc) => doc.data())
      this.setState({
        value: unreadNotifications.length
      })
    })
  }
  
  componentDidMount(){
    this.getNumberOfUnreadNotifications()
  }
  
  
   BellIconWithBadge=()=>{
      return(
        <View>
          <Icon name='bell'
            type='font-awesome'
            color='#fff'
            size={25}
            onPress={() =>this.props.navigation.navigate('Notifications')}/>
           <Badge
            value={this.state.value}
            status = "error"
            containerStyle={{ position: 'absolute', top: -4, right: -4 }}/>
        </View>
      )
    }
  
    render(){
      return(
          <Header
            leftComponent={<Icon name='bars' type='font-awesome' color='#fff'  onPress={() => this.props.navigation.toggleDrawer()}/>}
            centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize:30, fontWeight:"bold" } }}
            backgroundColor = "#F69400"
            rightComponent={<this.BellIconWithBadge {...this.props}/>}
          />
  
        )
    }
  
}