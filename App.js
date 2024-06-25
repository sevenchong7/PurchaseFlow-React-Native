import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/pages/beforeLogin/Login';
import RootNavigation from './src/navigation/RootNavigation';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './src/store/reducer/AuthReducer' 
import { thunk } from 'redux-thunk';
import productReducer from './src/store/reducer/ProductReducer';

const rootReducer = combineReducers({
  authReducer,productReducer
})

export const store = createStore(rootReducer,applyMiddleware(thunk));

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootNavigation/>
      </View>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  
  },
});
