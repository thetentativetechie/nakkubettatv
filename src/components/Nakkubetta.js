import React, {Component} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Home from './home/Home';
import Contact from './contact/Contact';
import HttpClient from '../utils/data/HttpClient';
import LiveTV from './livetv/LiveTV';
import {Icon, Button} from 'react-native-elements';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';

class Nakkubetta extends React.Component {
  constructor(props) {
    super(props);
    this.siteData = {};
    this.state = {
      home: {},
      nbtvContact: {},
      developerContact: {},
      liveTv: {},
      isLoading: true,
    };
  }

  async componentDidMount() {
    console.log('componentWillMount');
    this.siteData = await HttpClient.getLocalSiteData();
    console.dir(this.siteData);
    this.setState({
      home: this.siteData.home,
      contact: this.siteData.contact,
      liveTv: this.siteData.liveTv,
      isLoading: false,
    });
  }

  render() {
    return (
      <>
        {this.state.isLoading ? (
          <ActivityIndicator />
        ) : (
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName="LiveTv"
              barStyle={{backgroundColor: '#b2102f'}}>
              <Tab.Screen
                name="LiveTv"
                component={LiveTV}
                label="Live TV"
                options={{
                  title: 'Live TV',
                  tabBarIcon: ({tintColor}) => (
                    <View>
                      <Icon
                        name="video-camera"
                        color="#ffffff"
                        type="font-awesome"
                      />
                    </View>
                  ),
                }}
                initialParams={this.state.liveTv}
              />
              <Tab.Screen
                name="About"
                component={Home}
                label="About"
                options={{
                  title: 'About',
                  tabBarIcon: ({tintColor}) => (
                    <View>
                      <Icon
                        name="circle-o-notch"
                        color="#ffffff"
                        type="font-awesome"
                      />
                    </View>
                  ),
                }}
                initialParams={this.state.home}
                tabBarIcon={() => {
                  <View>
                    <Icon
                      name="television"
                      color="#ffffff"
                      type="font-awesome"
                    />
                  </View>;
                }}
              />
              <Tab.Screen
                name="Contact"
                component={Contact}
                label="Contact Us"
                options={{
                  title: 'Contact Us',
                  tabBarIcon: ({tintColor}) => (
                    <View>
                      <Icon
                        name="envelope"
                        color="#ffffff"
                        type="font-awesome"
                      />
                    </View>
                  ),
                }}
                initialParams={this.state.contact}
              />
            </Tab.Navigator>
          </NavigationContainer>
        )}
      </>
    );
  }
}

const Tab = createMaterialBottomTabNavigator();
export default Nakkubetta;
