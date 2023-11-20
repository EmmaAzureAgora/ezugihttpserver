/* eslint-disable no-unused-expressions */
import React, {
  useCallback, useRef, useEffect, useState,
} from 'react';
import { cx, } from 'react-emotion';

import {
  Badge, Container, Stream, StreamStates,
  highlightStreamClassName, placeholderStreamClassName, yourTurnClassName,
} from './style';
import { ConnectionStates } from '../useAgora';

const TAP_STATES = {
  INITIAL: 'INITIAL',
  RESET: 'RESET',
  ONCE: 'ONCE',
  MUTED_REMOTE: 'MUTED_REMOTE',
  TWICE: 'TWICE',
};

const StreamPlayer = ({ videoTrack, audioTrack, highlight,
  width, height, playerName, localPlayer, connectionState, streamsCount, isSmallGrid, ...props }) => {

  const streamRef = useRef(null);
  const [muted, setMuted,] = useState(false);
  const [remoteMuted, setRemoteMuted,] = useState(false);
  const [blockVideo, setBlockVideo,] = useState(false);
  const [tapTimes, setTapTimes,] = useState(TAP_STATES.INITIAL);

  const handleTapLocalPlayer = useCallback(() => {
    setMuted((prevState) => !prevState);
  }, []);

  const handleTap = useCallback(() => {
    switch (tapTimes) {
      case TAP_STATES.INITIAL:
      case TAP_STATES.RESET:
        setTapTimes(TAP_STATES.ONCE);
        break;
      case TAP_STATES.MUTED_REMOTE:
      case TAP_STATES.ONCE:
        setTapTimes(TAP_STATES.TWICE);
        break;
      case TAP_STATES.TWICE:
        setTapTimes(TAP_STATES.RESET);
        break;
      default:
        break;
    }
  }, [setTapTimes, tapTimes,]);

  useEffect(() => {
    switch (tapTimes) {
      case TAP_STATES.RESET:
        setMuted(false);
        setBlockVideo(false);
        break;
      case TAP_STATES.ONCE:
        setMuted(true);
        break;
      case TAP_STATES.TWICE:
        setMuted(true);
        setBlockVideo(true);
        break;
      default:
        break;
    }
    // eslint-disable-next-line
  }, [tapTimes,]);

  useEffect(() => {
    if (localPlayer && connectionState === ConnectionStates.CONNECTED) {
      audioTrack?.setMuted(muted);
      return;
    }
    if (muted === false && !localPlayer) {
      audioTrack?.play();
      return;
    }
    if (muted === true && !localPlayer) {
      audioTrack?.stop();
    }
  }, [muted, audioTrack, localPlayer, connectionState,]);

  useEffect(() => {
    if (!localPlayer) {
      if (audioTrack) {
        if (tapTimes === TAP_STATES.MUTED_REMOTE) {
          setTapTimes(TAP_STATES.RESET);
        }
        setRemoteMuted(false);
      } else {
        if (tapTimes === TAP_STATES.INITIAL || tapTimes === TAP_STATES.RESET) {
          setTapTimes(TAP_STATES.MUTED_REMOTE);
        }
        setRemoteMuted(true);
      }
    }
  }, [audioTrack, tapTimes, localPlayer,]);

  useEffect(() => {
    if (blockVideo) {
      videoTrack?.stop();
      return;
    }
    videoTrack?.play(streamRef.current);
  }, [blockVideo, videoTrack,]);

  useEffect(() => {
    if (!streamRef.current) return () => { };

    videoTrack?.play(streamRef.current);

    // in order to avoid echo, we don't play audioStream
    !localPlayer && audioTrack?.play();

    return () => {
      videoTrack?.stop();
      !localPlayer && audioTrack?.stop();
    };

    // no need for audioTrack as a dep, as this will trigger a rerender(flashing)
    // if a player mutes himself, agora will stop sending audioTrack natively (inside streamRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streamRef, videoTrack, localPlayer,]);

  return (
    <Container
      isSmallGrid={isSmallGrid}
      onClick={localPlayer ? handleTapLocalPlayer : handleTap}
      style={{ width, height, }}
    >
      <Badge localPlayer={localPlayer}>
        {playerName}
      </Badge>

      <Stream
        innerRef={streamRef}
        className={cx({
          [highlightStreamClassName]: highlight,
          [yourTurnClassName]: highlight && localPlayer,
          [placeholderStreamClassName]: !videoTrack,
        })}
        {...props}
      >
        {!videoTrack ? (
          <svg width="50%" height="50%" viewBox="0 0 32 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="9.33203" r="8" stroke="currentColor" strokeWidth="2" />
            <path
              d="M31 37.332C31 29.0478 24.2843 22.332 16 22.332C7.71573 22.332 1 29.0478 1 37.332"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        ) : null}
        {blockVideo
          ? (
            <div>block video</div>
          )
          : null}
      </Stream>

      {(remoteMuted || muted || blockVideo) &&
        <StreamStates bigger={blockVideo} streamsCount={streamsCount}>

          {(remoteMuted || muted) ? <div>muted</div> : null}

          {blockVideo ? (
            <div>video off</div>
          ) : null}

        </StreamStates>
      }
    </Container>
  );
};

export default StreamPlayer
