import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { Tabstyles } from '../styles/styles';
import { UseRenderContent } from '../../hook/useRenderContent';
const tabs = ['Predictor', 'Analytics', `Settings`];

const TabComponent = () => {
  const { activeTab, setActiveTab, renderContent } = UseRenderContent();

  return (
    <View style={Tabstyles.container}>
      <View style={Tabstyles.tabBar}>
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              Tabstyles.tab,
              activeTab === tab && Tabstyles.activeTab,
              activeTab === tab && Tabstyles.glowShadow,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                Tabstyles.tabText,
                activeTab === tab && Tabstyles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={Tabstyles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

export default TabComponent;
