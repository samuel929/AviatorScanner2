import React from 'react';
import Layout from '../layout/Layout';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAsyncStorage } from '../../hook/storagedata';
import { PredictionStats } from '../../constants/constants';
import { ControlPanelstyles } from '../styles/styles';
import PulsingWrapper from '../../hook/PulseAnimate';

interface ControlPanelProps {
  // Define any props if needed
  isActive?: boolean;
  setIsActive: (active: boolean) => void;
}

const ControlPanel = ({ isActive, setIsActive }: ControlPanelProps) => {
  const { value } = useAsyncStorage<PredictionStats>('totalPredictions');

  return (
    <PulsingWrapper>
      <Layout headingText="Control Panel" IconName="settings">
        <PulsingWrapper>
          <TouchableOpacity
            style={
              isActive
                ? ControlPanelstyles.TouchableButtonControlPanelActive
                : ControlPanelstyles.TouchableButtonControlPanel
            }
            accessibilityLabel="Open Settings"
            accessibilityHint="Navigates to the settings page"
            onPress={() => {
              setIsActive(!isActive); // Toggle active state as an example
            }}
          >
            <View style={ControlPanelstyles.containerActive}>
              <Icon name="power-settings-new" size={24} color="#000" />
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18 }}>
                {isActive ? 'Deactivate' : 'Activate'}
              </Text>
            </View>
          </TouchableOpacity>
        </PulsingWrapper>
        <PulsingWrapper>
          <View style={ControlPanelstyles.ViewContainerTextDiv}>
            <Layout style={ControlPanelstyles.LayoutTotalView}>
              <Icon name="wifi" size={24} color="#21c45d" />
              <Text style={ControlPanelstyles.AccuracyText}>Accuracy</Text>
              <Text style={ControlPanelstyles.percentageText}>78%</Text>
            </Layout>
            <Layout style={ControlPanelstyles.additionalLayoutTwo}>
              <Icon
                name="do-not-disturb-on-total-silence"
                size={24}
                color="#21c45d"
              />
              <Text style={ControlPanelstyles.TotalText}>TOTAL</Text>
              <Text style={ControlPanelstyles.totalPredictionText}>
                {value?.totalPredictions || '0'}
              </Text>
            </Layout>
          </View>
        </PulsingWrapper>
        <PulsingWrapper>
          <Layout style={ControlPanelstyles.additionalLayoutText}>
            <View>
              <Text style={ControlPanelstyles.StatusText}>STATUS</Text>
              <Text
                style={{
                  color: isActive ? '#21c45d' : '#ff3d00',
                  ...ControlPanelstyles.StatusStyling,
                }}
              >
                <Icon
                  name="circle"
                  size={12}
                  color={isActive ? '#21c45d' : '#ff3d00'}
                />{' '}
                {isActive ? 'ONLINE' : 'OFFLINE'}
              </Text>
            </View>
          </Layout>
        </PulsingWrapper>
      </Layout>
    </PulsingWrapper>
  );
};

export default ControlPanel;
