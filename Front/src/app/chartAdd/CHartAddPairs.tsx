import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addChart } from '../chartList/chartList-slice';

import { useGetPairsQuery } from '../chart/chart-service'
import { AssetProps } from './chartAdd-types';



const ChartAddPairs: React.FC<AssetProps> = ({ assetState: [asset, setAsset] }) => {
  const { data, error, isLoading } = useGetPairsQuery(asset);
  const dispatch: AppDispatch = useDispatch();

  const handlePairSelected = (e: any) => {
    dispatch(addChart({ id: uuidv4(), pair: e }))
    setAsset('')
  }

  // Create a list of options from kraken api pairs object
  // in order to fetch the data for the selected pair
  const pairsOptions = (data: any): any => {
    return Object.keys(data).map((key, i) => {
      if (data[key]['altname'].match("^[A-Za-z0-9]+$")) {
        return (
          <Dropdown.Item key={key} onClick={() => handlePairSelected(key)}>
            {data[key]['altname']}
          </Dropdown.Item>
        )
      }
    })
  }

  return (
    <div>
      { error && <>fetch pairs failed</> }
      { isLoading && <>Pairs Loading...</> }
      { !error &&
        <div>
          <DropdownButton disabled={asset ? false : true} className="pair" id="dropdown-basic-button" title={"Select Pair"}>
            {pairsOptions(data ? data : 0)}
          </DropdownButton>
        </div>
      }
    </div>
  )
};

export default ChartAddPairs;
