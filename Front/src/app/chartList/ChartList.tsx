import { useSelector } from 'react-redux'
import Chart from '../chart/Chart';

import type { RootState } from '../store'
import './chartList.css';
import { Container } from 'react-bootstrap';



const ChartList = (): JSX.Element => {
  const { items } = useSelector((state: RootState) => state.list)

  return (
    <Container className="chartList">
      {
        Object.keys(items).map((key: any, i: number) => {
          const id = items[key].id;
          const pair = items[key].pair;
          return <Chart key={id} id={id} pair={pair} />
        })
      }
    </Container>
  )
}

export default ChartList;
