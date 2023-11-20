import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';

import {
  ChooseRow, ChooseRowText, CurvedLine, LineContainer,
  StreamsGrid, StreamsRow, TakeSeat,
} from './style';
import StreamPlayer from './StreamPlayer/StreamPlayer';
import { Badge, } from './StreamPlayer/style';
import useAgora, { ConnectionStates } from './useAgora';


const renderSeatTaken = (seat, index) => (
  <TakeSeat key={seat.seatId + index}>
    <Badge>
      {seat.seatId}
    </Badge>
    seat taken
  </TakeSeat>
);

const renderTakeSeat = (seat, takeSeatFunc) => (
  <TakeSeat key={seat.seatId} freeSeat={true} onClick={() => { takeSeatFunc(seat.seatId); }}>
    free seat
  </TakeSeat>
);

const mapTakeSeat = (takeSeat) => (seat, index) => (
  (seat?.taken) ? renderSeatTaken(seat, index)
    : renderTakeSeat(seat, takeSeat)
);

const calculateStreamSize = (isSmallGrid, lowSize, maxSize) => (isSmallGrid ? lowSize : maxSize);

const renderBeforeSeated = (seats, takeSeat, chooseSeatText) => (seats ? (
  <>
    <ChooseRow>
      <LineContainer>
        <CurvedLine direction="left" />
      </LineContainer>
      <ChooseRowText>
        {chooseSeatText}
      </ChooseRowText>
      <LineContainer>
        <CurvedLine direction="right" />
      </LineContainer>
    </ChooseRow>

    <StreamsGrid>
      <StreamsRow>
        {seats.map(mapTakeSeat(takeSeat))}
      </StreamsRow>
    </StreamsGrid>
  </>
) : null);



const INITIAL_SEATS = [{
  seatId: 23,
},
{ seatId: 24 },
]

const agoraConfig =
{
  "appId": "d4b2aade700e49c2a99c99745088195a",
  "channelName": "emmatest",
  "token": "007eJxTYMhoKPe7enZpUNpR2bp7r55Lf3VQ32jPf8xDWWR2z9r/N/MVGFJMkowSE1NSzQ0MUk0sk40SLS2TLS3NTUwNLCwMLU0T249FpTYEMjKYaXUzMjIwMrAAMYjPBCaZwSQLmORgSM3NTSxJLS5hYAAAbc4j+Q==",
  "uid": "123"
}

const VideoChat = () => {
  const [seats, setSeats] = useState(INITIAL_SEATS)
  const [hasSeat, setHasSeat] = useState(false);

  const { appId, channelName, token, uid } = agoraConfig;

  const { localStreamTracks, join, leave, remoteUsers, client, } = useAgora();
  const [audioTrack, videoTrack,] = localStreamTracks || [];


  useEffect(() => {
    if (client && hasSeat) {
      console.log("lets join", agoraConfig)
      join(appId, channelName, token, uid);
      return;
    }
    leave();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, hasSeat,]);


  const streams = useMemo(() => {
    const localStream = { uid, videoTrack, audioTrack, };
    const allStreams = [localStream, ...remoteUsers,];
    const streamsMap = new Map(allStreams.map((stream) => [stream.uid, stream,]));

    const uuidsSeats = allStreams.map(s => s.uid);
    return uuidsSeats.map((uuid) => streamsMap.get(uuid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, videoTrack, audioTrack, remoteUsers,]);

  const isLocalPlayer = useCallback(
    (stream = {}) => uid === stream.uid,
    [uid,]
  );

  const isSmallGrid = streams.length >= 5;

  const takeSeat = (seatId) => {
    console.log("seat", seatId)
    setHasSeat(seatId);
    const newSeats = seats.map(seat => {
      if (seat.seatId === seatId) {
        return { ...seat, taken: true };
      }
      return seat;
    })
    setSeats(newSeats);
  }

  const renderPlaying = () => ((client?.connectionState !== ConnectionStates.DISCONNECTED) ? (
    <StreamsGrid>
      <StreamsRow
        style={{ justifyContent: 'center', }}
        isSmallGrid={isSmallGrid}
      >
        {streams.map((stream, index) => (
          <StreamPlayer
            isSmallGrid={isSmallGrid}
            width={calculateStreamSize(isSmallGrid, '14vw', '20vw')}
            height={calculateStreamSize(isSmallGrid, '24vw', '32vw')}
            key={stream.uid ?? index}
            videoTrack={stream?.videoTrack}
            connectionState={client?.connectionState}
            audioTrack={stream?.audioTrack}
            localPlayer={isLocalPlayer(stream)}
            streamsCount={streams.length}
          />
        ))}
      </StreamsRow>
    </StreamsGrid>
  ) : null);

  return (
    <>
      {hasSeat ? renderPlaying() : renderBeforeSeated(seats, takeSeat, "choose a seat")}
    </>
  );
};


export default VideoChat;
