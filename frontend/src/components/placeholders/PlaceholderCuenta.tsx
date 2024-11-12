

export default function PlaceholderCuenta() {
  return (
    <div className='d-flex flex-column placeholder-glow col-12'>
      <div className='col-12 d-flex flex-wrap align-items-center' style={{ height: '70vh' }}>
        <div className='col-lg-4 col-12 d-flex align-items-center justify-content-center'>
          <div style={{ height: '150px' }} className='btn btn-secondary disabled placeholder col-6'></div>
        </div>
        <div className='d-flex flex-wrap flex-column col-lg-8 col-12'>
          <div className='btn btn-secondary disabled placeholder mb-2'></div>
          <div className='btn btn-secondary disabled placeholder mt-2'></div>
        </div>
      </div>
      <div className='d-flex flex-wrap col-12 justify-content-around'>
        <div className='btn btn-secondary disabled placeholder col-12 col-lg-3'></div>
        <div className='btn btn-secondary disabled placeholder col-12 col-lg-3'></div>
        <div className='btn btn-secondary disabled placeholder col-12 col-lg-3'></div>
      </div>
    </div>
  );
}
