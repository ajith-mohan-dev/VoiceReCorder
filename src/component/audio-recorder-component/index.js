import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Platform} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';
import styles from './style';

const audioRecorderPlayer = new AudioRecorderPlayer();

const audioSet = {
  AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
  AudioSourceAndroid: AudioSourceAndroidType.MIC,
  AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
  AVNumberOfChannelsKeyIOS: 2,
  AVFormatIDKeyIOS: AVEncodingOption.aac,
};
const meteringEnabled = false;

var recordedList = [];

const AudioRecorderComponent = props => {
  const {recordedItem} = props || {};
  const [textOnRecorder, setTextOnRecorder] = useState('TAB TO RECORD');
  const [recordAudio, setRecordAudio] = useState({});
  const [playAudio, setPlayAudio] = useState({});

  const onRecorderPress = async () => {
    audioRecorderPlayer.stopPlayer();
    audioRecorderPlayer.removePlayBackListener();
    if (textOnRecorder === 'TAB TO RECORD') {
      setTextOnRecorder('STOP');
      const dirs = RNFetchBlob.fs.dirs;
      const path = Platform.select({
        ios: 'hello.m4a',
        android: `${dirs.CacheDir}/hello${Math.floor(
          Math.random() * 99 + 10,
        )}.mp3`,
      });

      const result = await audioRecorderPlayer.startRecorder(
        path,
        audioSet,
        meteringEnabled,
      );
      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordAudio({
          recordSecs: e.currentPosition,
          recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        });
      });

      console.log('AUDIOOOO RESULT', result);
    } else if (textOnRecorder === 'STOP') {
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordAudio({...recordAudio, recordSecs: 0});
      setTextOnRecorder('TAB TO RECORD');
      recordedItem([
        {
          ...recordAudio,
          filePath: result,
          createdTime: moment().format('DD-MM-YYYY, h:mm'),
        },
      ]);
      setRecordAudio({});
      console.log(result, recordedList);
    }
  };

  return (
    <>
      <View style={{alignItems: 'center', marginHorizontal: 30, marginTop: 20}}>
        <TouchableOpacity onPress={onRecorderPress}>
          <View style={styles.outerMostContainer}>
            <View style={styles.outerContainer}>
              <View style={styles.innerContainer}>
                <Image
                  source={
                    textOnRecorder === 'STOP'
                      ? require('../../assets/images/pause.png')
                      : require('../../assets/images/mic.png')
                  }
                  style={styles.audioIcon}
                />
                <Text style={styles.audioText}>{textOnRecorder}</Text>
                {textOnRecorder === 'STOP' && (
                  <Text style={[styles.audioText, {marginVertical: 0}]}>
                    {recordAudio?.recordTime}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default AudioRecorderComponent;
