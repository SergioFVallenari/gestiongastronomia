
import { Row, Col } from 'react-bootstrap';

export default function PlaceholderDashboard() {
  return (
    <Row>
      <Col xs={12} xl={4}>
        <div className='d-flex flex-column placeholder-glow col-12'>
          <div style={{ height: '500px' }} className='btn btn-secondary disabled placeholder col-12'></div>
        </div>
      </Col>
      <Col xs={12} xl={8}>
        <div className='d-flex flex-column placeholder-glow col-12'>
          <div style={{ height: '500px' }} className='btn btn-secondary disabled placeholder col-12'></div>
        </div>
      </Col>
      <Col xs={12} xl={8}>
        <div className='d-flex flex-column placeholder-glow col-12'>
          <div style={{ height: '500px' }} className='btn btn-secondary disabled placeholder col-12'></div>
        </div>
      </Col>
      <Col xs={12} xl={4}>
        <div className='d-flex flex-column placeholder-glow col-12'>
          <div style={{ height: '500px' }} className='btn btn-secondary disabled placeholder col-12'></div>
        </div>
      </Col>
    </Row>
  );
}
