import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {
  Image,
  Card,
  Button,
  Icon,
  SocialIcon,
  Divider,
  Avatar,
} from 'react-native-elements';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.screenProps = this.props.route.params.nbtvContact;
    this.devProps = this.props.route.params.developerContact;
    console.dir(this.screenProps);
    console.dir(this.devProps);
    console.dir(props);
  }

  handleOnPress(type) {
    let url = '';
    if (type === 'fb') {
      url = this.screenProps.socialMediaLinks.fb;
    } else if (type === 'youtube') {
      url = this.screenProps.socialMediaLinks.youtube;
    } else if (type === 'mail') {
      url = 'mailto:' + this.screenProps.socialMediaLinks.email;
    } else if (type === 'phone') {
      url = 'tel:' + this.screenProps.phone1;
    }
    console.log('handleOnPress = ' + url);
    this.openURL(url);
  }

  async openURL(url) {
    try {
      let canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        console.log('opearation not supported');
        Alert.alert('Error', 'not supported');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Not supported');
    }
  }

  handleDevOnPress(type) {
    let url = '';
    if (type === 'linkedIn') {
      url = this.devProps.linkedIn;
    } else if (type === 'website') {
      url = this.devProps.website;
    } else if (type === 'mail') {
      url = 'mailto:' + this.devProps.email;
    } else if (type === 'phone') {
      url = 'whatsapp://send?text=hello&phone=' + this.devProps.phone1;
    }
    console.log('handleOnPress = ' + url);
    this.openURL(url);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.itemDeveloper}>
          <Card title={this.devProps.title}>
            <View style={styles.devCardImgView}>
              <Avatar
                rounded
                source={{uri: this.devProps.avatarImage}}
                size="xlarge"
                activeOpacity={0.7}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>

            <Text style={styles.devCardTxt}>
              {this.devProps.line1}
              {'\n'}
            </Text>
            <Text style={styles.devCardTxt}>
              {this.devProps.line2}
              {'\n'}
            </Text>
            <Divider style={{backgroundColor: '#b2102f', height: 3}} />
            <View style={styles.containerIcons}>
              <SocialIcon
                type="linkedin"
                onPress={() => this.handleDevOnPress('linkedIn')}
              />
              <Icon
                raised
                type="font-awesome"
                name="whatsapp"
                color="#1b5e20"
                onPress={() => this.handleDevOnPress('phone')}
              />
              <Icon
                raised
                type="font-awesome"
                name="envelope"
                color="#df293a"
                onPress={() => this.handleDevOnPress('mail')}
              />
              <SocialIcon
                type="github"
                onPress={() => this.handleDevOnPress('website')}
              />
            </View>
          </Card>
        </View>
        <View style={styles.itemAddress}>
          <ScrollView horizontal={true}>
            <Card title={this.screenProps.address1.title}>
              <Divider style={{backgroundColor: '#b2102f', height: 3}} />
              <Text style={styles.addressText}>
                {'\n'}
                {this.screenProps.address1.line1}
                {'\n'}
              </Text>
              <Text style={styles.addressText}>
                {this.screenProps.address1.line2}
                {'\n'}
              </Text>
              <Text style={styles.addressText}>
                {this.screenProps.address1.line3}
                {'\n'}
              </Text>
            </Card>
            <Card title={this.screenProps.address2.title}>
              <Divider style={{backgroundColor: '#b2102f', height: 3}} />
              <Text style={styles.addressText}>
                {'\n'}
                {this.screenProps.address2.line1}
                {'\n'}
              </Text>
              <Text style={styles.addressText}>
                {this.screenProps.address2.line2}
                {'\n'}
              </Text>
              <Text style={styles.addressText}>
                {this.screenProps.address2.line3}
                {'\n'}
              </Text>
            </Card>
          </ScrollView>
          <View style={styles.containerIcons}>
            <SocialIcon
              type="facebook"
              onPress={() => this.handleOnPress('fb')}
            />
            <SocialIcon
              type="youtube"
              onPress={() => this.handleOnPress('youtube')}
            />
            <Icon
              raised
              type="font-awesome"
              name="phone"
              color="#1b5e20"
              onPress={() => this.handleOnPress('phone')}
            />
            <Icon
              raised
              type="font-awesome"
              name="envelope"
              color="#df293a"
              onPress={() => this.handleOnPress('mail')}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ff1744',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemAddress: {
    flex: 1,
  },
  itemDeveloper: {
    flex: 2,
  },
  addressText: {
    fontWeight: 'bold',
  },
  itemFollowUs: {},
  itemDeveloper: {},
  devCardImg: {
    height: 150,
    width: 150,
  },
  devCardTxt: {
    fontWeight: 'bold',
  },
  containerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Contact;
