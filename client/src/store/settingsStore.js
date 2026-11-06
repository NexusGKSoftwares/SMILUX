import { useState } from 'react';

// Lightweight store implementation for settings
const defaultSettings = {
  general: {
    companyName: 'Smilux Dental Software'
  }
};

export default function useSettingsStore(selector) {
  if (typeof selector === 'function') {
    return selector(defaultSettings);
  }
  return defaultSettings;
}
