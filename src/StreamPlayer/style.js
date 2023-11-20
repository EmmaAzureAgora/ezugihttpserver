import styled, { css, } from 'react-emotion';

const getBadgeBackground = () => "black"

const getBadgeColor = () => "#000"

export const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  ${({ isSmallGrid, }) => `
    margin: 0 ${isSmallGrid ? 2 : 4}px;
  `}
`;

export const Badge = styled.div`
 ${({ children, }) => (children ? `
 position: absolute;
  max-width: 80%;
  border-radius: 3px;
  padding: 2px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  top: 3px;
  left: 3px;
  font-size: 8px;
  background: ${getBadgeBackground()};
  color: ${getBadgeColor()};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  z-index: 2;
  user-select: none;
 }
 ` : 'display: none')}
`;

export const Stream = styled.div`
  pointer-events: all;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  overflow: hidden;
  transition: all .2s ease-in;
  background: "black";
`;

export const StreamStates = styled.div`
  transition: width .2s ease-in-ou;
  background: "black";
  position: absolute;
  display: flex;
  justify-content: center;
  width: 30px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 4px;
  border-radius: 100px;
  max-width: 100%;
  padding: 4px 8px;


  ${({ streamsCount, }) => (streamsCount === 6 ? `
    @media (max-width: 350px) {
      padding: 4px 6px;
    }
  ` : '')}

  ${({ streamsCount, }) => (streamsCount === 7 ? `
    @media (max-width: 400px) {
      padding: 4px 6px;
    }

    @media (max-width: 350px) {
      padding: 4px 4px;
    }
  ` : '')}
`;

export const highlightStreamClassName = css`
  border: 2px solid #FFFFFF;
  box-shadow: 0px 0px 4px rgba(255, 255, 255, 0.8);
`;

export const yourTurnClassName = css`
  border: 3px solid yellow;
`;

export const placeholderStreamClassName = css`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

export const iconClassName = css`
    padding: 0;
    box-sizing: content-box;
`;

export const SoundIconContainer = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 14px;
  height: 14px;

  > svg {
    color: white;
    fill: white;
  }
`;
