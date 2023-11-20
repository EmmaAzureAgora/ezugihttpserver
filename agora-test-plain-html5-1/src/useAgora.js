import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

// agora connection states
// https://api-ref.agora.io/en/voice-sdk/web/4.x/globals.html#connectionstate
export const ConnectionStates = {
  CONNECTED: 'CONNECTED',
  DISCONNECTED: 'DISCONNECTED',
  CONNECTING: 'CONNECTING',
  RECONNECTING: 'RECONNECTING',
  DISCONNECTING: 'DISCONNECTING',
};
AgoraRTC.setLogLevel(0);

const isIntermediaryConnectionState = (state) => [
  ConnectionStates.DISCONNECTING,
  ConnectionStates.CONNECTING,
  ConnectionStates.RECONNECTING].includes(state);


const connectionState$ = {
  subscribers: new Set(),
  state: null,
  subscribe(subscriber) {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  },
  next(state) {
    for (const subscriber of this.subscribers) {
      subscriber(state);
    }
  },
};

function waitForConnectedState() {
  return new Promise((resolve) => {
    const unsub = connectionState$.subscribe((curState) => {
      if (curState === ConnectionStates.CONNECTED) {
        resolve();
        unsub();
      }
    });
  });
}

const multimediaTracks = new Set();

function closeLocalTracks() {
  for (const track of multimediaTracks) {
    const [audioTrack, videoTrack] = track;
    try {
      audioTrack.stop();
      videoTrack.stop();

      audioTrack.close();
      videoTrack.close();
    } catch (error) {
      console.log("error closeLocalTracks", error)
    }
  }

  multimediaTracks.clear();
}

function useAgora() {
  const [localStreamTracks, setLocalStreamTracks] = useState();
  const [client, setClient] = useState();
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [error, setError] = useState();
  const [expired, setExpired] = useState(false);

  async function join(appid, channel, token, uid = 0) {
    if (!client || isIntermediaryConnectionState(client.connectionState)) return;

    try {
      await client.join(appid, channel, token || null, 123);
      const multimediaTrack = await AgoraRTC.createMicrophoneAndCameraTracks({ AGC: true, AEC: true, ANS: true });

      multimediaTracks.add(multimediaTrack);

      if (client.connectionState === ConnectionStates.CONNECTED) {
        await client.publish(multimediaTrack);
        setLocalStreamTracks(multimediaTrack);
      }
    } catch (e) {
      let deviceError;

      // https://api-ref.agora.io/en/voice-sdk/web/4.x/index.html#error-codes
      setError(deviceError || e);
    }
  }

  async function leave() {
    if (!client) return;

    if (isIntermediaryConnectionState(client.connectionState)) {
      await waitForConnectedState();
    }

    closeLocalTracks();
    await client?.leave();
    setRemoteUsers([]);
  }

  useEffect(() => {
    const codec = 'h264';
    setClient(AgoraRTC.createClient({ codec, mode: 'rtc' }));
    return () => { setClient(undefined); };
  }, []);

  useEffect(() => {
    if (!client) return () => null;
    setRemoteUsers(client.remoteUsers);

    const updateRemoteUsers = () => setRemoteUsers([...client.remoteUsers]);

    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      updateRemoteUsers();
    };

    const handleUserUnpublished = () => {
      updateRemoteUsers();
    };

    const handleUserJoined = () => {
      updateRemoteUsers();
    };

    const handleUserLeft = () => {
      updateRemoteUsers();
    };

    const handleConnectionStateChange = (curState) => {
      connectionState$.next(curState);
    };

    const handleTokenExpired = () => {
      setExpired(true);
    };

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);
    client.on('connection-state-change', handleConnectionStateChange);
    client.on('token-privilege-did-expire', handleTokenExpired);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
      client.off('connection-state-change', handleConnectionStateChange);
      client.off('token-privilege-did-expire', handleTokenExpired);
    };
  }, [client]);

  return {
    error,
    expired,
    localStreamTracks,
    client,
    leave,
    join,
    remoteUsers,
  };
}

export default useAgora;
