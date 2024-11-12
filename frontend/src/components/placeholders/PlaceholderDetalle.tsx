

export default function PlaceholderDetalle() {
  return (
    <div className='d-flex flex-column placeholder-glow col-12'>
      <div style={{ height: '80px' }} className='btn btn-secondary placeholder col-12'></div>
      <div className='d-flex justify-content-between flex-wrap row mt-3'>
        <div style={{ height: '70vh' }} className='col-12'>
          <div>
            <div className='d-flex placeholder-glow'>
              <div style={{ height: '300px' }} className='placeholder col-5'></div>
              <div className='col-7 d-flex flex-column align-items-center'>
                <div className='placeholder placeholder-lg col-4 mt-2 mb-2 w-75'></div>
                <div className='placeholder col-4 mt-2 mb-2 placeholder-lg w-75'></div>
                <div className='placeholder col-4 mt-2 mb-2 placeholder-lg w-75'></div>
                <div className='placeholder col-4 mt-2 mb-2 placeholder-lg w-75'></div>
                <div className='placeholder col-4 mt-2 mb-2 placeholder-lg w-75'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
