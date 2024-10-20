import React from 'react';
import { Link } from 'react-router-dom';
import { Text, Image } from './elements';

interface ILogo {
  src: string;
  alt: string;
  name?: string;
  href: string;
  className?: string;
  id?: string;
}

const Logo: React.FC<ILogo> = ({ src, alt, name, href, className, id }) => {
  return (
    <>
      {name ? (
        <Link to={href} className={`mc-logo-group ${className}`}>
          <Image src={src} alt={alt} id={id} />
          <Text as='span'>{name}</Text>
        </Link>
      ) : (
        <Link to={href} className={`mc-logo ${className}`}>
          <Image src={src} alt={alt} id={id} />
        </Link>
      )}
    </>
  );
};

export default Logo;
