import { useState } from 'react';

// Lightweight store implementation for settings
const defaultSettings = {
  general: {
    companyName: 'Smilux Dental Practice'
  }
};

export default function useSettingsStore(selector) {
  if (typeof selector === 'function') {
    return selector(defaultSettings);
  }
  return defaultSettings;
}
