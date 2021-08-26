import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {Navigation} from './src/navigator/Navigation';

const AppState = ({children}: any) => {
  return <PermissionsProvider>{children}</PermissionsProvider>;
};
const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <Navigation />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
