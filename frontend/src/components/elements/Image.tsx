import React from 'react';

interface IImage {
  src: string;
  alt?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  id?: string;
}

const Image: React.FC<IImage> = ({ src, alt, className, onClick, id }) => {
  return <img className={className} src={src} alt={alt} onClick={onClick} id={id} />;
};

export default Image;
