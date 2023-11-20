import styled from 'react-emotion';

export const StreamsGrid = styled.div`
  width: 100%;
  height: 32vw;
  overflow: hidden;
  overflow-x: auto;
  display: flex;
  align-items: center;
  border-radius: 3px;
  pointer-events: auto;

  @media all and (max-height: 600px) {
    transform-origin: bottom;
    transform: scale(0.85);
  }
`;

export const StreamsRow = styled.div`
  flex: 1;
  display: inline-flex;

  justify-content: space-between;

  align-items: center;
  height: 100%;
  overflow: hidden;
  ${({ isSmallGrid, }) => `
    margin: 0 ${isSmallGrid ? 0 : 5}px;
  `}
`;

export const TakeSeat = styled.div`
  position: relative;
  width: calc(100vw / 7 - 5px);
  height: 20vw;
  border-radius: 4px;
  margin: 20px;

  ${({ freeSeat, }) => (freeSeat
    ? `
    background: rgba(0, 29, 26, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  `
    : '')}
`;

export const ChooseRowText = styled.div`
  padding: 0 10px;
  font-family: "Montserrat";
  font-weight: 500;
  color: #ffffff;
`;

export const LineContainer = styled.div`
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`;

export const ChooseRow = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
`;

export const CurvedLine = styled.div`
  position: absolute;
  top: 50%;
  flex-grow: 1;
  height: 20px;
  width: 100%;
  opacity: 0.2;
  border: 1px solid #ffffff;
  border-radius: 20px;
  ${({ direction, }) => (direction === 'left' ? 'left: 10px' : 'right: 10px')}
`;
