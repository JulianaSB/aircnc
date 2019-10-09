import React from 'react';
import { YellowBox } from 'react-native';
import Routes from './src/routes';

//começo da frase do warning que quero q nao exiba
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function App() {
  return <Routes />
}
