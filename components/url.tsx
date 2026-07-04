import {Platform} from 'react-native';

let baseUrl: string;

Platform.OS == 'android'
  ? (baseUrl = 'http://10.22.249.170:3000/api/v1')
  : (baseUrl = 'http://localhost:3000/api/v1');

export default baseUrl;
