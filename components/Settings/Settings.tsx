import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../layout/Layout';
import { settingsOptions } from '../../util/util';
import { styles } from '../styles/styles';

const Settings = () => {
  return (
    <Layout headingText=" Settings" IconName="settings">
      <View style={styles.container}>
        {settingsOptions.map((option, index) => (
          <View key={index} style={styles.cardColor}>
            <Text style={styles.text}>{option.text}</Text>
            <Text style={styles.systemText}>{option.dataText}</Text>
          </View>
        ))}
      </View>
    </Layout>
  );
};

export default Settings;
