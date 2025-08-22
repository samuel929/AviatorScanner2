import { View, StyleSheet, Dimensions } from 'react-native';

import Header from './components/header/header';
import TabComponent from './components/Tabs/tabs';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <TabComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#11192b' },
  camera: { flex: 1, height: '50%' },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(0,0,0,0.75)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 30,
    shadowColor: '#1e90ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  resultCard: {
    marginTop: 20,
    backgroundColor: '#1c1c1e',
    borderRadius: 12,
    padding: 16,
    width: CARD_WIDTH,
    alignItems: 'center',
  },
  resultText: {
    color: '#00ffaa',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  predictionCard: {
    marginTop: 12,
    backgroundColor: '#292929',
    borderRadius: 10,
    padding: 14,
    width: CARD_WIDTH,
  },
  predictionText: {
    color: '#ffcc00',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  debugText: {
    marginTop: 16,
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  spinner: {
    marginTop: 12,
  },
});
