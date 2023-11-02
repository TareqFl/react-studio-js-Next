import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useThemeSettings } from '../../../hooks';
import { secondsToHMS } from '@/utils/timeformatter';
const CustomTimeLine = ({ bottom, ee }: { bottom: number; ee: any }) => {
  const { theme, keyPress } = useThemeSettings();
  const { key, shiftKey, code } = keyPress;
  const { textColor } = theme;
  // total duration of the track
  const [duration, setDuration] = useState('00:00:00');

  // set max value for the slider to reach
  const [rawValue, setRawValue] = useState<number>(0);

  //   when the track is playing or clicked the seeker time is updated
  const [seeker, setSeeker] = useState<number>(0);

  // useState to display seeker position
  const [dpSeeker, setDpSeeker] = useState('00:00:00');

  // where the audio is playing or no
  const [isPlaying, setIsplaying] = useState<boolean>(false);

  // Play Button Ref
  const playRef = useRef(null);
  useEffect(() => {
    // get the total duration time of the longest track
    ee.on('getTrackDuration', (value: number) => {
      var newDuration = secondsToHMS(value);

      setDuration(() => newDuration);
      setRawValue(() => value);
    });

    // get new duration after editing or shifting a track
    ee.on('newTimeDurationAfterEdit', (value: number) => {
      var newDuration = secondsToHMS(value);

      setDuration(() => newDuration);
      setRawValue(() => value);
    });

    // when audio plays, cursor interaction
    ee.on('timeupdate', (start: number) => {
      // to fixed 4 based on input step prop
      setSeeker(() => Number(parseFloat(String(start)).toFixed(4)));

      var newSeeked = secondsToHMS(start);

      setDpSeeker(() => newSeeked);
    });

    // when track has finished playing
    ee.on('fnishedPlaying', () => {
      setDpSeeker(() => '00:00:00');
      setSeeker(() => 0);
      setIsplaying(!isPlaying);
    });
    // if theres no audio
    if (bottom !== 0) {
      setDuration(() => '00:00:00');
      setDpSeeker(() => '00:00:00');
      setSeeker(() => 0);
      setIsplaying(() => !isPlaying);
    }
  }, [ee, bottom]);

  useEffect(() => {
    if (code === 'Space' && shiftKey) {
      isPlaying ? ee.emit('play') : ee.emit('pause');
      setIsplaying(!isPlaying);
    }
  }, [key, code, shiftKey, ee, isPlaying]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        left: 0,
        bottom,
        paddingLeft: '32px',
        paddingRight: '32px',
      }}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
        gap={2}
        sx={{
          height: 75,
          backgroundColor: bottom === 0 ? 'transparent' : 'white',
          backdropFilter: 'blur(10px)',
          borderRadius: 16,
          padding: bottom === 0 ? '0 8px' : '0 300px',
          transition: '.7s ease',
        }}
      >
        <Tooltip
          title={isPlaying ? 'Play(shft + space)' : 'Pause(shft + space)'}
        >
          <IconButton
            ref={playRef}
            onClick={() => {
              setIsplaying(!isPlaying);
              isPlaying ? ee.emit('play') : ee.emit('pause');
            }}
          >
            {isPlaying ? (
              <PlayArrow fontSize={'large'} sx={{ color: textColor }} />
            ) : (
              <Pause fontSize={'large'} sx={{ color: textColor }} />
            )}
          </IconButton>
        </Tooltip>

        <Box sx={{ width: '95px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{dpSeeker}</Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            input: {
              width: '100%',
              '::-webkit-slider-thumb': {
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                position: 'relative',
                bottom: '7px',
              },
              '::-webkit-slider-runnable-track': {
                height: '2px',
                cursor: 'pointer',
              },
            },
          }}
        >
          <input
            className={'audioBar'}
            type={'range'}
            min={0}
            max={rawValue}
            step={0.0001}
            value={seeker}
            onChange={(e) => {
              const {
                target: { value },
              } = e;
              ee.emit('sliderTimeUpdate', value);
            }}
          />
        </Box>

        <Box sx={{ width: '95px' }}>
          <Typography sx={{ fontWeight: 'bold' }}>{duration}</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default CustomTimeLine;
