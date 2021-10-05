import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';

import ChartAddPairs from './CHartAddPairs';
import ChartAddAssets from './ChartAddAssets';
import './chartAdd.css'



const ChartAdd: React.FC = (): JSX.Element => {
  const [asset, setAsset] = React.useState<string>('');

  return (
    <Container className="chartAdd">
      <Row>
        <Col>
          <Stack direction="horizontal">
            <Col xs={2} md={2}>
              <h1>Charts</h1>
            </Col>
            <Col xs={3} md={3} className="ms-auto">
              <Stack direction="horizontal">
                <ChartAddAssets assetState={[asset, setAsset]} />
                <ChartAddPairs assetState={[asset, setAsset]} />
              </Stack>
            </Col>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default ChartAdd;
