export default function PlaceholderTabla() {
  return (
    <div id='padre'>
      <div className='d-flex justify-content-between align-items-center placeholder-glow mb-2'>
        <div className='placeholder col-3'></div>
        <div className='col-6 d-flex justify-content-center placeholder-glow'>
          <div className='btn btn-secondary disabled placeholder col-2 ms-1 me-1'></div>
          <div className='btn btn-secondary disabled placeholder col-2 ms-1 me-1'></div>
          <div className='btn btn-secondary disabled placeholder col-2 ms-1 me-1'></div>
        </div>
        <div className='placeholder col-3'></div>
      </div>
      <table id='table' className='display table-hover nowrap'>
        <thead>
          <tr className='placeholder-glow'>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
            <th className='placeholder col-12 placeholder-lg'></th>
          </tr>
        </thead>
        <tbody>
          <tr className='placeholder-glow'>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
            <td className='placeholder col-12 placeholder-lg'></td>
          </tr>
        </tbody>
      </table>
      <div className='d-flex justify-content-between placeholder-glow mt-2'>
        <div className='placeholder col-3'></div>
        <div className='placeholder col-3'></div>
      </div>
    </div>
  );
}
