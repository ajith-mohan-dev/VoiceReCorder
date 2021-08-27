import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Slider from '@react-native-community/slider';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import styles from './style';

const audioRecorderPlayer = new AudioRecorderPlayer();

const AudioListComponent = props => {
  const {audioList, deleteAudioList = () => {}} = props || {};
  const [playAudio, setPlayAudio] = useState({});
  const [playTitle, setPlayTitle] = useState('PLAY');
  const [sliderValue, setSliderValue] = useState(0);
  const [pauseEnable, setPauseEnable] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    if (
      playTitle === 'PAUSE' &&
      playAudio.currentPositionSec &&
      playAudio.currentDurationSec
    ) {
      let val = +playAudio.currentPositionSec / +playAudio.currentDurationSec;
      setSliderValue(val ? val : 0);
    }
  }, [playAudio]);

  const onPlayPress = async item => {
    if (Array.isArray(audioList) && audioList.length > 0) {
      if (!pauseEnable) {
        audioRecorderPlayer.stopPlayer();
        audioRecorderPlayer.removePlayBackListener();
      }

      setPlayAudio(item);
      setPlayTitle('PAUSE');

      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
        ios: 'hello.m4a',
        android: `${dirs.CacheDir}/hello${item.filePath.slice(-6)}`,
      });

      const msg = await audioRecorderPlayer.startPlayer(path);
      console.log(msg);
      audioRecorderPlayer.addPlayBackListener(e => {
        setPlayAudio({
          currentPositionSec: e.currentPosition,
          currentDurationSec: e.duration,
          playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
          duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        });
      });
    }
  };

  const pausePlayPress = async () => {
    console.log('PAUSE PLAY CALLEDD');
    setPlayTitle('PLAY');
    setPauseEnable(true);
    const result = await audioRecorderPlayer.pausePlayer();
    console.log(result);
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPauseEnable(false);
          onPlayPress(item);
        }}>
        <View style={styles.cardContainer}>
          <View style={styles.row}>
            <Text style={styles.boldText}>{`Voice ${index + 1}`}</Text>
            <Text style={styles.normalText}>{`${item.recordTime}`}</Text>
          </View>
          <View style={styles.secondRow}>
            <Text style={styles.normalText}>{item.createdTime}</Text>
            <TouchableOpacity onPress={() => deleteAudioList(index)}>
              <Image
                source={require('../../assets/images/delete.png')}
                style={styles.removeIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View>
        {audioList.length > 0 && (
          <View>
            <View style={styles.Container}>
              <Slider
                style={{width: 300, height: 50}}
                minimumValue={0}
                maximumValue={1}
                value={sliderValue}
                minimumTrackTintColor="#52A2F9"
                maximumTrackTintColor="#00897B"
                thumbTintColor="#52A2F9"
              />
            </View>
            <View style={styles.Container}>
              <TouchableOpacity
                onPress={() => {
                  if (playCount < audioList.length) {
                    if (playCount === 0) {
                      onPlayPress(audioList[0]);
                    } else {
                      setPlayCount(playCount - 1);
                      onPlayPress(audioList[playCount]);
                    }
                  }
                }}>
                <Image
                  source={require('../../assets/images/next.png')}
                  style={[
                    styles.arrowIcon,
                    {
                      transform: [{rotate: '180deg'}],
                    },
                  ]}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  playTitle === 'PAUSE'
                    ? pausePlayPress()
                    : onPlayPress(audioList[0]);
                }}>
                <Image
                  source={
                    playTitle === 'PAUSE'
                      ? require('../../assets/images/play_pause.png')
                      : require('../../assets/images/play-button.png')
                  }
                  style={styles.pauseIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (playCount < audioList.length) {
                    setPlayCount(playCount + 1);
                    onPlayPress(audioList[playCount]);
                  }
                }}>
                <Image
                  source={require('../../assets/images/next.png')}
                  style={styles.arrowIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={audioList}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
    </>
  );
};

export default AudioListComponent;
