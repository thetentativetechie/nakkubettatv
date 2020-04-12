import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Linking} from 'react-native';
import {Image, Card, Button, Icon} from 'react-native-elements';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.screenProps = this.props.route.params;
    console.dir(props);
  }

  handleOnPress(type) {
    let url = '';
    if (type === 'website') {
      url = this.screenProps.website;
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content1}>
          <Card title={this.screenProps.title}>
            <Image
              source={{uri: this.screenProps.cardImage}}
              style={{width: 150, height: 150}}
              PlaceholderContent={<ActivityIndicator />}
            />
            <Text style={styles.content1CardTxt}>
              {this.screenProps.aboutTv}
              {'\n'}
            </Text>
          </Card>
        </View>
        <View style={styles.content2}>
          <Card
            title={this.screenProps.title2}
            wrapperStyle={styles.content2Card}>
            <Text style={styles.content2CardTxt}>
              {this.screenProps.aboutFoundation} {'\n'}
            </Text>
            <Button
              icon={
                <Icon type="font-awesome" color="#ffffff" name="sign-out" />
              }
              iconRight
              buttonStyle={styles.content2CardBtn}
              title="Visit Website "
              onPress={() => this.handleOnPress('website')}
            />
            <Text style={styles.footerText}>
              {'\n'}
              {this.screenProps.footerNotes}
            </Text>
          </Card>
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
  content1: {
    flex: 3,
  },
  content2: {
    flex: 2,
  },
  content1Card: {
    backgroundColor: '#f3f5f7',
  },
  content1CardTxt: {
    fontWeight: 'bold',
  },
  content1CardImg: {
    height: 150,
  },
  content1CardBtn: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: '#1b5e20',
  },
  content2Card: {
    backgroundColor: '#f3f5f7',
  },
  content2CardTxt: {
    fontWeight: 'bold',
  },
  content2CardBtn: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    backgroundColor: '#b2102f',
  },
  footerText: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default Home;
