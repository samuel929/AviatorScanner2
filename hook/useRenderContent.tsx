import { useState } from 'react';
import Platform from '../components/Platform/Platform';
import Analytics from '../components/Analytics/Analyics';
import Settings from '../components/Settings/Settings';
export const UseRenderContent = () => {
  const [activeTab, setActiveTab] = useState('Predictor');
  const renderContent = () => {
    switch (activeTab) {
      case 'Predictor':
        return <Platform />;
      case 'Analytics':
        return <Analytics />;
      case 'Settings':
        return <Settings />;
      default:
        return null;
    }
  };
  return { activeTab, setActiveTab, renderContent };
};
