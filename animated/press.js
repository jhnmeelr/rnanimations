import React, { Component } from 'react';

import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

export default class Press extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.animatedValue = new Animated.Value(1);
  }

  handlePressIn = () => {
    Animated.spring(this.animatedValue, {
      toValue: 0.5,
    }).start();
  }

  handlePressOut = () => {
    Animated.spring(this.animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
    }).start();
  }

  render() {
    const animatedStyle = { transform: [{ scale: this.animatedValue }] };

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
          <Animated.View style={[styles.button, animatedStyle]}>
            <Text style={styles.text}>Press Me</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#333',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
});
