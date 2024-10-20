import React from 'react';
import { Box, Image } from './elements/index.ts';

interface IRoundAvatar {
  size?: string;
  src: string;
  alt?: string;
}

const RoundAvatar: React.FC<IRoundAvatar> = ({ size, src, alt }) => {
  return (
    <Box className={`mc-round-avatar ${size || 'md'}`}>
      <Image src={src} alt={alt} />
    </Box>
  );
};

export default RoundAvatar;
