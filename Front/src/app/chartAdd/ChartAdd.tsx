import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';

import ChartAddPairs from './CHartAddPairs';
import ChartAddAssets from './ChartAddAssets';
import './chartAdd.css'



const ChartAdd: React.FC = (): JSX.Element => {
  const [asset, setAsset] = React.useState<string>('');

  return (
    <Container id="chartAdd" className="chartAdd">
      <Row>
        <Col>
          <Stack direction="horizontal">
            <Col xs={4}>
              <h1>Charts</h1>
            </Col>
            <Col xs={8} className="d-md-flex justify-content-md-end">
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
