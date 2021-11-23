import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorWhite: {
    color: theme.colors.white
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading
  },
  fontSizeBody: {
    fontSize: theme.fontSizes.body
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold
  },
  fontBackGround: {
      backgroundColor: theme.colors.primary
  },
  fontWrap: {
      flexWrap: theme.fontWrap.flexWrap
  }
});

const Text = ({ color, fontSize, fontWeight, style, backgroundColor, flexWrap, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'primary' && styles.colorPrimary,
    color === 'white' && styles.colorWhite,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontSize === 'body' && styles.fontSizeBody,
    fontWeight === 'bold' && styles.fontWeightBold,
    backgroundColor === 'primary' && styles.fontBackGround,
    flexWrap === 'wrap' && styles.fontWrap,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;