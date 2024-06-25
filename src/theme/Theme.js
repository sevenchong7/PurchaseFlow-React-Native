// theme.js
import { createTheme } from '@rneui/themed';
import Colors from '../theme/colors';

// const theme = createTheme({
//   colors: {
//     primary: '#1f4298',
//     secondary: '#499AD2',
//     accent: '#E6F3FE',
//     error: '#FF5252',
//     info: '#2196F3',
//     success: '#4CAF50',
//     warning: '#FFC107',

//     statusBar_grey: '#8E8E8E',
//     black: '#000000',
//     dark_grey: '#6B6B6B', // word
//     light_grey: '#E7EBF0', // background_grey
//     grey_shadow: '#B5B5B5',
//     grey_circle: "#898989", 
//     grey_word: '#999999',
//     grey_accordion:'e7ebf0',

//     light_blue: '#E3F3FF',
//     blue_word: '#1b4586',
//     red_word: '#d2292d',
//     background: '#ffffff',
//     text: '#000000',
//   },
//   Button: {
//     buttonStyle: {
//       backgroundColor: '#6200ee',
//       borderRadius: 5,
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//     },
//     titleStyle: {
//       color: '#ffffff',
//       fontSize: 16,
//     },
//   },
//   TextInput: {
//     inputContainerStyle: {
//       borderBottomWidth: 1,
//       borderBottomColor: '#6200ee',
//     },
//     inputStyle: {
//       color: '#000000',
//       fontSize: 16,
//     },
//     containerStyle: {
//       marginVertical: 10,
//     },
//   },
//   // text: {
//   //   color: '#000000'
//   // }
// });

const MyTheme = {
  dark: false, // no dark theme
  colors: {
    ...Colors // get from constants/color
  },
  fonts: {
      regular: {
      //   fontFamily: 'aviance_regular', 
      }
    }
};

export default MyTheme;
