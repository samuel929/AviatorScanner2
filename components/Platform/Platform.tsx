import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';

import { Camera, useCameraDevice } from 'react-native-vision-camera';
import TextRecognition from 'react-native-text-recognition';
import Layout from '../layout/Layout';
import { NextPredictionstyles, Platformstyles } from '../styles/styles';
import NextPredictions from '../NextPredictions/NextPredictions';
import { Constants, PredictionStats } from '../../constants/constants';
import { fetchAviatorData } from '../../api/api';
import { useAsyncStorage } from '../../hook/storagedata';
import ControlPanel from '../ControlPanel/ControlPanel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import History from '../History/History';
import PulsingWrapper from '../../hook/PulseAnimate';
import { useBounceAndPulse } from '../../hook/useBounceAndPulse';

const Platform = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { animatedTextStyle } = useBounceAndPulse();

  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [prediction, setPrediction] = useState('');
  const [platform, setPlatform] = useState<string>('');
  const [showIconCamera, setShowIconCamera] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [avgMultiplier, setAvgMultiplier] = useState<boolean>(false);
  const { setValue } = useAsyncStorage<PredictionStats>('totalPredictions');
  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Camera access is required to use this feature. Please enable it in settings.',
        );
      }
    })();
  }, []);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchAviatorData(platform);
        // const response = await fetchAviatorData('betway');
        if (response && response.length > 0) {
          setPrediction(response);
          let avgMultiplier = response.map(
            (item: { multiplier: number }) => item.multiplier,
          );
          avgMultiplier =
            avgMultiplier.reduce((a: number, b: number) => a + b, 0) /
            avgMultiplier.length;
          setPlatform('Betway'); // Assuming Betway for this example
          setValue({
            totalPredictions: response.length.toString(),
            avgMultiplier: avgMultiplier.toFixed(2).toString(),
          });
          setTimeout(() => {
            setAvgMultiplier(true);
          }, 4000);

          setIsActive(true);
        } else {
          throw new Error('No upcoming platforms found.');
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        throw error;
      }
    };
    getData();
  }, [platform, setValue]);

  const scan = async () => {
    if (!camera.current || scanning || !device) return;
    setScanning(true);
    setShowIconCamera(!showIconCamera);
    try {
      const photo = await camera.current.takePhoto({
        enableShutterSound: false,
      });

      const result = await TextRecognition.recognize(photo.path);
      const text = result.join(' ').toLowerCase();

      // Check for game context (not just "aviator" text)
      const gameIndicators = ['crash game', 'bet', 'multiplier', 'cash out'];

      let platform = 'Unknown Platform';

      const hasGameContext = (platformKeyword: string) =>
        text.includes(platformKeyword) &&
        text.includes('aviator') &&
        gameIndicators.some(indicator => text.includes(indicator));

      if (hasGameContext('lottostar')) {
        platform = Constants.LOTTOSTAR;
      } else if (hasGameContext('betway')) {
        platform = Constants.BETWAY;
      }

      if (platform !== 'Unknown Platform') {
        setPlatform(platform);
        setResultMessage(`🛩️ Detected: Aviator on ${platform}`);
      } else if (text.includes('aviator')) {
        setResultMessage(
          '❌ Aviator text detected, but no game context found. Please show the full game interface.',
        );
      } else {
        setResultMessage('❌ No Aviator game detected.');
      }
    } catch (err) {
      let errorMessage = 'Unknown error';
      if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = (err as { message: string }).message;
      }
      setResultMessage(`⚠️ Scan failed: ${errorMessage}`);
    } finally {
      setScanning(false);
    }
  };

  useEffect(() => {
    if (!Array.isArray(prediction) || prediction.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 3) % prediction.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, [prediction]);

  const visiblePredictions = prediction.slice(currentIndex, currentIndex + 3);

  if (hasPermission === null || !device) {
    return (
      <View style={Platformstyles.centered}>
        <Text style={Platformstyles.text}>Loading camera devices...</Text>
      </View>
    );
  }

  if (!device || !hasPermission) {
    return (
      <View style={Platformstyles.centered}>
        <Text style={Platformstyles.text}>
          {hasPermission === false
            ? 'Camera permission denied. Please enable it in settings.'
            : 'No back camera available.'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={Platformstyles.ScrollViewConatiner}>
      <PulsingWrapper>
        <Layout headingText="Platform Scanner" IconName={'camera'}>
          <PulsingWrapper>
            <Camera
              ref={camera}
              style={Platformstyles.camera}
              device={device}
              isActive={true}
              photo
            />
            {isActive && avgMultiplier && (
              <BlurView
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 8,
                }}
                blurType="light"
                blurAmount={10}
                reducedTransparencyFallbackColor="white"
              />
            )}
          </PulsingWrapper>
          {showIconCamera && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                position: 'relative',
                justifyContent: 'space-between',
                zIndex: 1,
                bottom: 50,
              }}
            >
              <PulsingWrapper
                style={{ position: 'absolute', bottom: 180, left: -310 }}
              >
                <View
                  style={{
                    borderColor: '#21c45d',
                    borderWidth: 2,
                    width: 30,
                    height: 30,

                    borderRadius: 8,
                    shadowColor: '#04ff00',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.9,
                    shadowRadius: 10,
                    alignSelf: 'center', // Center horizontally
                    marginTop: 50,
                    elevation: 10,
                  }}
                ></View>
              </PulsingWrapper>
              <View
                style={{
                  borderColor: '#21c45d',
                  borderWidth: 2,
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  bottom: 180,
                  right: -160,
                  borderRadius: 8,
                  shadowColor: '#04ff00',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                  alignSelf: 'center', // Center horizontally
                  marginTop: 50,
                  elevation: 10,
                }}
              ></View>
              <View
                style={{
                  borderColor: '#21c45d',
                  borderWidth: 2,
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  bottom: -20,
                  left: -160,
                  borderRadius: 8,
                  shadowColor: '#04ff00',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                  alignSelf: 'center', // Center horizontally
                  marginTop: 50,
                  elevation: 10,
                }}
              ></View>
              <View
                style={{
                  borderColor: '#21c45d',
                  borderWidth: 2,
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  bottom: -20,
                  right: -160,
                  borderRadius: 8,
                  shadowColor: '#04ff00',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.9,
                  shadowRadius: 10,
                  alignSelf: 'center', // Center horizontally
                  marginTop: 50,
                  elevation: 10,
                }}
              ></View>
            </View>
          )}
          {isActive && avgMultiplier && (
            <View
              style={{
                zIndex: 9,
                position: 'absolute',
                bottom: 380,
                alignItems: 'center',
                shadowColor: '#00ff00',
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 0.8,
                shadowRadius: 20,
                elevation: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#00ff00',
                  textShadowColor: '#00ff00',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 15,
                  marginBottom: 5,
                }}
              >
                2.40X
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: '#00ff00',
                  textShadowColor: '#00ff00',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 10,
                  letterSpacing: 2,
                }}
              >
                CASHOUT
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={[
              Platformstyles.button,
              scanning && Platformstyles.buttonDisabled,
            ]}
            onPress={scan}
            disabled={scanning}
            accessibilityLabel={
              scanning ? 'Scanning in progress' : 'Scan for Aviator'
            }
            accessibilityHint="Triggers text recognition on the camera feed"
          >
            <View style={Platformstyles.platformCentering}>
              <Icon
                name="play-arrow"
                size={24}
                color="black"
                style={Platformstyles.iconStyling}
              />
              <Text style={Platformstyles.buttonText}>
                {scanning
                  ? '⏳ Scanning...'
                  : isActive && avgMultiplier
                  ? 'NEXT'
                  : 'START SCAN'}
              </Text>
            </View>
          </TouchableOpacity>

          {scanning && (
            <ActivityIndicator
              size="large"
              color="#00ffcc"
              style={Platformstyles.spinner}
            />
          )}

          {Array.isArray(prediction) && prediction.length > 0 && (
            <View style={Platformstyles.predictionCard}>
              <Text style={Platformstyles.predictionHeaderText}>
                {resultMessage && ` - ${resultMessage}`}
              </Text>

              <View style={Platformstyles.platformCenteringColumn}>
                {visiblePredictions?.map(
                  (item: { multiplier: number; _id: string }) => (
                    <View
                      key={item._id}
                      style={{ flexDirection: 'column', margin: 5 }}
                    >
                      <Text style={Platformstyles.predictionText}>
                        {item.multiplier}X
                      </Text>
                    </View>
                  ),
                )}
              </View>

              <Text style={Platformstyles.predictionTextIndicator}>
                {prediction.length > 1
                  ? `Total Predictions: ${prediction.length}`
                  : `Total Prediction: ${prediction.length}`}
              </Text>
            </View>
          )}
        </Layout>
      </PulsingWrapper>
      <NextPredictions />
      <ControlPanel isActive={isActive} setIsActive={setIsActive} />
      <History />
    </ScrollView>
  );
};

export default Platform;
