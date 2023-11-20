import React from 'react';
import { iconClassName, SoundIconContainer, } from './style';
import MicOffSVG from './icons/MicOffSVG';
import SoundOffSVG from './icons/SoundOffSVG';

const SoundIcon = ({ localPlayer, }) => (localPlayer ? (
  <SoundIconContainer className={iconClassName}>
    <MicOffSVG />
  </SoundIconContainer>
) : (
  <SoundIconContainer className={iconClassName}>
    <SoundOffSVG />
  </SoundIconContainer>
));

export default SoundIcon;
