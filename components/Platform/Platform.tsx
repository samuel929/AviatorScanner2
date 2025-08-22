import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
  TextInput,
  Modal,
  Dimensions,
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

const { width, height } = Dimensions.get('window');

interface MultiplierItem {
  multiplier: number;
  _id: string;
}

interface MultiplierInputs {
  multiplier1: string;
  multiplier2: string;
  multiplier3: string;
  multiplier4: string;
  multiplier5: string;
}

const Platform = () => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  // State management
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanning, setScanning] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [prediction, setPrediction] = useState<MultiplierItem[]>([]);
  const [platform, setPlatform] = useState<string>('');
  const [showIconCamera, setShowIconCamera] = useState(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [avgMultiplier, setAvgMultiplier] = useState<boolean>(false);
  const [showMultiplierModal, setShowMultiplierModal] = useState(false);
  const [multiplierInputs, setMultiplierInputs] = useState<MultiplierInputs>({
    multiplier1: '',
    multiplier2: '',
    multiplier3: '',
    multiplier4: '',
    multiplier5: '',
  });
  const [customPredictions, setCustomPredictions] = useState<MultiplierItem[]>(
    [],
  );
  const [usingCustomPredictions, setUsingCustomPredictions] = useState(false);

  const { animatedTextStyle } = useBounceAndPulse();
  const { setValue } = useAsyncStorage<PredictionStats>('totalPredictions');

  // Memoized values
  const currentPredictions = useMemo(
    () => (usingCustomPredictions ? customPredictions : prediction),
    [usingCustomPredictions, customPredictions, prediction],
  );

  const visiblePredictions = useMemo(
    () => currentPredictions.slice(currentIndex, currentIndex + 3),
    [currentPredictions, currentIndex],
  );

  // Initialize camera permissions
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted');
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Camera access is required to use this feature. Please enable it in settings.',
          );
        }
      } catch (error) {
        console.error('Camera permission error:', error);
        setHasPermission(false);
      }
    };

    initializeCamera();
  }, []);

  // Fetch aviator data
  useEffect(() => {
    if (!platform || usingCustomPredictions) return;

    const getData = async () => {
      try {
        const response = await fetchAviatorData(platform);
        if (response && response.length > 0) {
          setPrediction(response);
          const multipliers = response.map(
            (item: MultiplierItem) => item.multiplier,
          );
          const avgMult =
            multipliers.reduce((a: number, b: number) => a + b, 0) /
            multipliers.length;

          setPlatform('Betway');
          setValue({
            totalPredictions: response.length.toString(),
            avgMultiplier: avgMult.toFixed(2).toString(),
          });

          setTimeout(() => setAvgMultiplier(true), 4000);
          setIsActive(true);
        } else {
          throw new Error('No upcoming platforms found.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [platform, setValue, usingCustomPredictions]);

  // Prediction cycling effect
  useEffect(() => {
    if (!Array.isArray(currentPredictions) || currentPredictions.length === 0)
      return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 3) % currentPredictions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentPredictions]);

  // Generate random multiplier
  const generateRandomMultiplier = useCallback((): number => {
    const weights = [
      { range: [1.0, 2.0], weight: 0.4 }, // 40% chance for 1.0-2.0x
      { range: [2.0, 5.0], weight: 0.35 }, // 35% chance for 2.0-5.0x
      { range: [5.0, 10.0], weight: 0.15 }, // 15% chance for 5.0-10.0x
      { range: [10.0, 50.0], weight: 0.08 }, // 8% chance for 10.0-50.0x
      { range: [50.0, 100.0], weight: 0.02 }, // 2% chance for 50.0-100.0x
    ];

    const random = Math.random();
    let cumulativeWeight = 0;

    for (const { range, weight } of weights) {
      cumulativeWeight += weight;
      if (random <= cumulativeWeight) {
        const [min, max] = range;
        return Math.round((Math.random() * (max - min) + min) * 100) / 100;
      }
    }

    return 1.5; // Fallback
  }, []);

  // Handle multiplier input change
  const handleMultiplierInputChange = useCallback(
    (field: keyof MultiplierInputs, value: string) => {
      // Allow only numbers and decimal point
      if (/^\d*\.?\d*$/.test(value)) {
        setMultiplierInputs(prev => ({ ...prev, [field]: value }));
      }
    },
    [],
  );

  // Generate predictions from inputs
  const generatePredictionsFromInputs = useCallback(() => {
    const inputs = Object.values(multiplierInputs).filter(
      val => val.trim() !== '',
    );

    if (inputs.length === 0) {
      Alert.alert('Error', 'Please enter at least one multiplier value.');
      return;
    }

    // Convert inputs to numbers and validate
    const multipliers = inputs
      .map(val => parseFloat(val))
      .filter(val => !isNaN(val) && val > 0);

    if (multipliers.length === 0) {
      Alert.alert(
        'Error',
        'Please enter valid multiplier values (greater than 0).',
      );
      return;
    }

    // Generate additional random predictions to reach at least 10 predictions
    const totalPredictions = 15;
    const randomCount = Math.max(0, totalPredictions - multipliers.length);
    const randomMultipliers = Array.from(
      { length: randomCount },
      generateRandomMultiplier,
    );

    const allMultipliers = [...multipliers, ...randomMultipliers];

    // Shuffle the array for randomness
    const shuffled = allMultipliers.sort(() => Math.random() - 0.5);

    const predictions: MultiplierItem[] = shuffled.map((mult, index) => ({
      _id: `custom_${Date.now()}_${index}`,
      multiplier: mult,
    }));

    setCustomPredictions(predictions);
    setUsingCustomPredictions(true);
    setShowMultiplierModal(false);
    setIsActive(true);
    setAvgMultiplier(true);

    // Update stats
    const avgMult =
      predictions.reduce((sum, pred) => sum + pred.multiplier, 0) /
      predictions.length;
    setValue({
      totalPredictions: predictions.length.toString(),
      avgMultiplier: avgMult.toFixed(2).toString(),
    });

    Alert.alert(
      'Success',
      `Generated ${predictions.length} predictions including your ${multipliers.length} custom multipliers!`,
    );
  }, [multiplierInputs, generateRandomMultiplier, setValue]);

  // Reset to API predictions
  const resetToAPIPredictions = useCallback(() => {
    setUsingCustomPredictions(false);
    setCustomPredictions([]);
    setCurrentIndex(0);
  }, []);

  // Camera scan function
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

      const gameIndicators = ['crash game', 'bet', 'multiplier', 'cash out'];

      let detectedPlatform = 'Unknown Platform';

      const hasGameContext = (platformKeyword: string) =>
        text.includes(platformKeyword) &&
        text.includes('aviator') &&
        gameIndicators.some(indicator => text.includes(indicator));

      if (hasGameContext('lottostar')) {
        detectedPlatform = Constants.LOTTOSTAR;
      } else if (hasGameContext('betway')) {
        detectedPlatform = Constants.BETWAY;
      }

      if (detectedPlatform !== 'Unknown Platform') {
        setPlatform(detectedPlatform);
        setResultMessage(`🛩️ Detected: Aviator on ${detectedPlatform}`);
        setUsingCustomPredictions(false); // Switch back to API predictions
      } else if (text.includes('aviator')) {
        setResultMessage(
          '❌ Aviator text detected, but no game context found. Please show the full game interface.',
        );
      } else {
        setResultMessage('❌ No Aviator game detected.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setResultMessage(`⚠️ Scan failed: ${errorMessage}`);
    } finally {
      setScanning(false);
    }
  };

  // Loading state
  if (hasPermission === null || !device) {
    return (
      <View style={Platformstyles.centered}>
        <ActivityIndicator size="large" color="#00ffcc" />
        <Text style={Platformstyles.text}>Loading camera devices...</Text>
      </View>
    );
  }

  // Permission denied state
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
          {/* Custom Multiplier Input Button */}
          <TouchableOpacity
            style={[
              Platformstyles.button,
              { marginBottom: 10, backgroundColor: '#ff6b35' },
            ]}
            onPress={() => setShowMultiplierModal(true)}
          >
            <View style={Platformstyles.platformCentering}>
              <Icon name="edit" size={24} color="white" />
              <Text style={[Platformstyles.buttonText, { color: 'white' }]}>
                Custom Multipliers
              </Text>
            </View>
          </TouchableOpacity>

          {/* Reset Button (only show when using custom predictions) */}
          {usingCustomPredictions && (
            <TouchableOpacity
              style={[
                Platformstyles.button,
                { marginBottom: 10, backgroundColor: '#6c757d' },
              ]}
              onPress={resetToAPIPredictions}
            >
              <View style={Platformstyles.platformCentering}>
                <Icon name="refresh" size={24} color="white" />
                <Text style={[Platformstyles.buttonText, { color: 'white' }]}>
                  Reset to API
                </Text>
              </View>
            </TouchableOpacity>
          )}

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

          {/* Camera corner indicators */}
          {showIconCamera && (
            <View style={{ position: 'relative', zIndex: 1, bottom: 50 }}>
              {[
                { bottom: 180, left: -310 },
                { bottom: 180, right: -310 },
                { bottom: -20, left: -310 },
                { bottom: -20, right: -310 },
              ].map((position, index) => (
                <PulsingWrapper
                  key={index}
                  style={{ position: 'absolute', ...position }}
                >
                  <View style={styles.cornerIndicator} />
                </PulsingWrapper>
              ))}
            </View>
          )}

          {/* Cashout display */}
          {isActive && avgMultiplier && (
            <View style={styles.cashoutDisplay}>
              <Text style={styles.multiplierText}>2.40X</Text>
              <Text style={styles.cashoutText}>CASHOUT</Text>
            </View>
          )}

          {/* Scan button */}
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

          {/* Predictions display */}
          {currentPredictions.length > 0 && (
            <View style={Platformstyles.predictionCard}>
              <Text style={Platformstyles.predictionHeaderText}>
                {usingCustomPredictions ? 'Custom Predictions' : resultMessage}
              </Text>

              <View style={Platformstyles.platformCenteringColumn}>
                {visiblePredictions.map((item: MultiplierItem) => (
                  <View
                    key={item._id}
                    style={{ flexDirection: 'column', margin: 5 }}
                  >
                    <Text style={Platformstyles.predictionText}>
                      {item.multiplier}X
                    </Text>
                  </View>
                ))}
              </View>

              <Text style={Platformstyles.predictionTextIndicator}>
                {currentPredictions.length > 1
                  ? `Total Predictions: ${currentPredictions.length}`
                  : `Total Prediction: ${currentPredictions.length}`}
                {usingCustomPredictions && ' (Custom)'}
              </Text>
            </View>
          )}
        </Layout>
      </PulsingWrapper>

      {/* Multiplier Input Modal */}
      <Modal
        visible={showMultiplierModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowMultiplierModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Custom Multipliers</Text>
            <Text style={styles.modalSubtitle}>
              Enter up to 5 multipliers. Random multipliers will be added to
              reach 15 total predictions.
            </Text>

            {(
              Object.keys(multiplierInputs) as Array<keyof MultiplierInputs>
            ).map((key, index) => (
              <TextInput
                key={key}
                style={styles.multiplierInput}
                placeholder={`Multiplier ${index + 1} (e.g., 2.45)`}
                placeholderTextColor="#999"
                value={multiplierInputs[key]}
                onChangeText={value => handleMultiplierInputChange(key, value)}
                keyboardType="decimal-pad"
                maxLength={8}
              />
            ))}

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setShowMultiplierModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.generateButton]}
                onPress={generatePredictionsFromInputs}
              >
                <Text style={styles.generateButtonText}>Generate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <NextPredictions />
      <ControlPanel isActive={isActive} setIsActive={setIsActive} />
      <History />
    </ScrollView>
  );
};

// Styles
const styles = {
  cornerIndicator: {
    borderColor: '#21c45d',
    borderWidth: 2,
    width: 30,
    height: 30,
    borderRadius: 8,
    shadowColor: '#04ff00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    alignSelf: 'center' as const,
    marginTop: 50,
    elevation: 10,
  },
  cashoutDisplay: {
    zIndex: 9,
    position: 'absolute' as const,
    bottom: 380,
    alignItems: 'center' as const,
    shadowColor: '#00ff00',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  multiplierText: {
    fontSize: 48,
    fontWeight: 'bold' as const,
    color: '#00ff00',
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 5,
  },
  cashoutText: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: '#00ff00',
    textShadowColor: '#00ff00',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    letterSpacing: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    width: width * 0.9,
    maxHeight: height * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: '#333',
    textAlign: 'center' as const,
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center' as const,
    marginBottom: 20,
    lineHeight: 22,
  },
  multiplierInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  modalButtonContainer: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center' as const,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#6c757d',
  },
  generateButton: {
    backgroundColor: '#28a745',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  generateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600' as const,
  },
};

export default Platform;
