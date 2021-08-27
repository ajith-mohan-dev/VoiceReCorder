import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowIcon: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
    marginHorizontal: 50,
  },
  pauseIcon: {height: 35, width: 35, resizeMode: 'contain'},
  listContainer: {backgroundColor: '#8FA7B9', marginTop: 20},
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginBottom: 1.2,
    paddingVertical: 5,
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  boldText: {fontSize: 16, fontWeight: 'bold', alignItems: 'center'},
  normalText: {fontSize: 14, color: '#00897B'},
  secondRow: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  removeIcon: {
    height: 18,
    width: 18,
    resizeMode: 'contain',
  },
});

export default styles;
