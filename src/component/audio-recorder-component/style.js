import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  outerMostContainer: {
    height: 230,
    width: 230,
    borderRadius: 230 / 2,
    backgroundColor: '#B9E1FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerContainer: {
    height: 200,
    width: 200,
    borderRadius: 200 / 2,
    backgroundColor: '#52A2F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    height: 150,
    width: 150,
    borderRadius: 150 / 2,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  audioIcon: {height: 65, width: 65, resizeMode: 'contain'},
  audioText: {
    marginVertical: 10,
    fontSize: 12,
    color: '#8FA7B9',
  },
});
export default styles;
