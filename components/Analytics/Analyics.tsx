import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../layout/Layout';
import { styles } from '../styles/styles';
import { useAsyncStorage } from '../../hook/storagedata';
import { PredictionStats } from '../../constants/constants';

const Analytics = () => {
  const { value } = useAsyncStorage<PredictionStats>('totalPredictions');
  const AnalyticsData: any[] = [
    {
      text: 'Total Predictions',
      dataText: value?.totalPredictions || '0',
    },
    {
      text: 'Avg Multiplier',
      dataText: value?.avgMultiplier || '0.00x',
    },
  ];
  return (
    <Layout headingText="Analytics" IconName="analytics">
      <View style={styles.container}>
        {AnalyticsData.map((item, index) => (
          <View key={index} style={styles.cardColor}>
            <Text style={styles.text}>{item.text}</Text>
            <Text style={styles.systemText}>{item.dataText}</Text>
          </View>
        ))}
      </View>
    </Layout>
  );
};

export default Analytics;
