import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Icon, Button} from 'react-native-elements';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation';

class LiveTV extends React.Component {
  constructor(props) {
    super(props);
    console.dir(props);
    this.screenProps = this.props.route.params;
    this.mounted = false;
    this.state = {
      videoPlayerStyle: {
        width: 300,
        height: 300,
      },
      screenOrientation: 'PORTRAIT',
    };
  }

  setVideoPlayerDimension(orientation) {
    console.log('setVideoPlayerDimension Orientation = ' + orientation);
    let screenWidth = Math.round(Dimensions.get('window').width);
    let screenHeight = Math.round(Dimensions.get('window').height);

    let videoPlayerHeight = 300;
    if (orientation === 'LANDSCAPE') {
      videoPlayerHeight = screenHeight - (1 / 10) * screenHeight;
    }

    if (this.mounted) {
      this.setState({
        videoPlayerStyle: {
          width: screenWidth,
          height: videoPlayerHeight,
        },
        screenOrientation: orientation,
      });
    }

    console.dir(this.state);
  }

  orientationDidChange = orientation => {
    console.log('orientationDidChange ' + orientation);
    Orientation.unlockAllOrientations();
    /*
    if (orientation === 'LANDSCAPE') {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    } */

    this.setVideoPlayerDimension(orientation);
  };

  componentWillUnMount() {
    Orientation.unlockAllOrientations();
    Orientation.removeOrientationListener(this.orientationDidChange);
    this.mounted = false;
  }

  changeToLandscape = () => {
    console.log('changeToLandscape');
    Orientation.lockToLandscape();
    this.setVideoPlayerDimension('LANDSCAPE');
  };

  componentDidMount() {
    this.mounted = true;
    console.log('componentDidMount');
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);
    const initialOrientation = Orientation.getInitialOrientation();
    console.log(initialOrientation);
    this.setVideoPlayerDimension(initialOrientation);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.videoContainer}>
          <Video
            source={{uri: this.screenProps.url1}}
            style={[this.state.videoPlayerStyle, styles.videoPlayer]}
            controls={true}
            fullscreen={true}
            resizeMode="stretch"
            ref={ref => {
              this.playerRef = ref;
            }}
            fullscreenOrientation="landscape"
          />
          {this.state.screenOrientation === 'PORTRAIT' ? (
            <>
              <Button
                buttonStyle={styles.fullScreenBtn}
                disabledStyle={styles.fullScreenBtn}
                title={this.screenProps.text1}
                disabled={true}
              />
              <Button
                buttonStyle={styles.fullScreenBtn}
                disabledStyle={styles.fullScreenBtn}
                title={this.screenProps.footerNotes}
                disabled={true}
              />
            </>
          ) : null}
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
  videoContainer: {},
  footerContainer: {},
  videoPlayer: {
    marginTop: 5,
  },
  fullScreenBtn: {
    height: 50,
    backgroundColor: '#ff1744',
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
  exitBtn: {
    top: 25,
    left: 20,
    position: 'absolute',
    margin: 1,
    zIndex: 1,
    opacity: 1,
    width: 30,
    height: 30,
    backgroundColor: '#b2102f',
  },
});

export default LiveTV;
