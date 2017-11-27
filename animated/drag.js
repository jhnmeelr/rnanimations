import React, { Component } from 'react';

import { View, Text, StyleSheet, Animated, PanResponder } from 'react-native';

export default class Press extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this._value = { x: 0, y: 0 };
    this.animatedValue = new Animated.ValueXY();
    this.animatedValue.addListener((value) => this._value = value);
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => true,
      onMoveShouldSetPanResponder: (e, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        this.animatedValue.setOffset({ ...this._value });
        this.animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([ null, { dx: this.animatedValue.x, dy: this.animatedValue.y } ]),
      onPanResponderRelease: (e, gestureState) => {
        this.animatedValue.flattenOffset();
        Animated.decay(this.animatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy },
        }).start();
      },
    });
  }

  render() {
    const animatedStyle = { transform: this.animatedValue.getTranslateTransform() };

    return (
      <View style={styles.container}>
        <Animated.View style={[styles.box, animatedStyle]} {...this.panResponder.panHandlers}>
          <Text style={styles.text}>Drag Me</Text>
        </Animated.View>
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
  box: {
    backgroundColor: '#333',
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff'
  }
});
