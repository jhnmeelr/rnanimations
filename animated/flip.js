import React, { Component } from 'react';

import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';

export default class Flip extends Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    });

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
    });
  }

  componentDidMount() {
    // Animated.timing(this.animatedValue, {
    //   toValue: 150,
    //   duration: 1000,
    //   easing: Easing.bounce,
    // }).start();
  }

  flipCard = () => {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateX: this.frontInterpolate }
      ]
    };
    const backAnimatedStyle = {
      transform: [
        { rotateX: this.backInterpolate }
      ]
    };

    return (
      <View style={styles.container}>
        <View>
          <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
            <Text style={[styles.flipText]}>This text is flipping on the front</Text>
          </Animated.View>
          <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
            <Text style={[styles.flipText]}>This text is flipping on the front</Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={this.flipCard}>
          <Text>Flip!</Text>
        </TouchableOpacity>
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
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden'
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0
  },
  flipText: {
    padding: 10,
    fontSize: 16,
    color: '#fff'
  }
});
