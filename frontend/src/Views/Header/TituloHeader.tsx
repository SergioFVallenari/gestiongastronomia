import React from 'react';
import { Heading } from '../../components/elements';

interface ITituloHeader {
  titulo: string;
}

const TituloHeader: React.FC<ITituloHeader> = ({ titulo }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column justify-content-between align-items-end col-9'>
        <div className='d-flex w-100 align-items-center justify-content-start col-12'>
          <Heading className='mc-breadcrumb-title'>{titulo}</Heading>
        </div>
      </div>
    </div>
  );
};

export default TituloHeader;
