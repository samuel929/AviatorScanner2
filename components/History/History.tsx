import React from 'react';
import { View, Text } from 'react-native';
import Layout from '../layout/Layout';
import { historyOptions } from '../../util/util';
import PulsingWrapper from '../../hook/PulseAnimate';

const History = () => {
  return (
    <PulsingWrapper>
      <Layout
        IconName="history"
        headingText="History"
        style={{ marginVertical: 20 }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginVertical: 5,
            marginHorizontal: 2,
          }}
        >
          {historyOptions.map((item, index) => (
            <Layout
              key={index}
              style={{
                width: 100,
                marginVertical: 5,
                marginHorizontal: 2,
                padding: 10,
                backgroundColor: '#232730',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{ fontWeight: 'bold', fontSize: 17, color: '#85efa9' }}
              >
                {item.text}
              </Text>

              <Text
                style={{
                  marginTop: 10,
                  fontWeight: 'bold',
                  fontSize: 20,
                  color: '#04ff00',
                  fontSize: 20,
                  fontWeight: 'bold',
                  shadowColor: '#04ff00',
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                  elevation: 10,
                }}
              >
                {item.dataText}
              </Text>
            </Layout>
          ))}
        </View>
      </Layout>
    </PulsingWrapper>
  );
};

export default History;
