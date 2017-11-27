import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight, NavigatorIOS } from 'react-native';

import Basic from './animated/basic';

const SCREENS = [
  { component: Basic, title: 'Basic', passProps: {} },
];

class MainScreen extends Component {
  static propTypes = {
    navigator: PropTypes.object.isRequired,
  }

  renderButtons = () => {
    return SCREENS.map((screen, key) => (
      <TouchableHighlight key={key} onPress={() => this.props.navigator.push(screen)}>
        <Text style={{ fontSize: 20, lineHeight: 30 }}>{screen.title}</Text>
      </TouchableHighlight>
    ));
  }

  render() {
    const style = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    };

    return <View style={style}>{this.renderButtons()}</View>;
  }
}

export default class App extends Component {
  render() {
    const initialRoute = {
      component: MainScreen,
      title: 'Main screen',
      passProps: {},
    };

    return <NavigatorIOS initialRoute={initialRoute} style={{ flex: 1 }} />;
  }
}
