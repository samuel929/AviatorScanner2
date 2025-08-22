import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Layout from '../layout/Layout';
import { NextPredictionstyles } from '../styles/styles';
import { useBounceAndPulse } from '../../hook/useBounceAndPulse';
import Animated from 'react-native-reanimated';
import PulsingWrapper from '../../hook/PulseAnimate';
const getRandomConfidence = () => Math.floor(Math.random() * 31) + 70; // 70-100

const predictions = [{ text: '1.50x', confidencerate: getRandomConfidence() }];

const NextPredictions = () => {
  const { animatedTextStyle } = useBounceAndPulse();

  return (
    <PulsingWrapper>
      <Layout
        headingText="Next Predictions"
        style={NextPredictionstyles.pushRight}
      >
        <View>
          {predictions.map((p, i) => (
            <View key={i}>
              <Animated.Text
                style={[NextPredictionstyles.predictionText, animatedTextStyle]}
              >
                {p.text}
              </Animated.Text>
              <View style={NextPredictionstyles.nextDirection}>
                <TouchableOpacity style={NextPredictionstyles.TouchableButton}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    - STABLE
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={NextPredictionstyles.confidenceButton}
                  accessibilityLabel="Scan for next prediction"
                  accessibilityHint="Triggers a scan for the next prediction"
                >
                  <Text style={NextPredictionstyles.confidenceText}>
                    {p.confidencerate}% confidence
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          <Text style={NextPredictionstyles.nextScanText}>
            Scan 4 numbers from platform to get prediction
          </Text>
        </View>
      </Layout>
    </PulsingWrapper>
  );
};

export default NextPredictions;
