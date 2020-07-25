import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import { fetchStateInfo } from '../../api';

const StatePicker = ({ handleStateChange, country }) =>{
    const [fetchedNewStates, setFetchedNewStates] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedNewStates(await fetchStateInfo());
        }

        fetchAPI();
    }, [setFetchedNewStates])

    const stateOption = (
        country === 'united-states'
            ? <FormControl>
                <NativeSelect defaultValue="" onChange={(e) => handleStateChange(e.target.value)}>
                    {fetchedNewStates.map((state, i) => <option key={i} value={state.state}>{state.displayName}</option>)}
                </NativeSelect>
            </FormControl> : null
  
    );

    return (
        <div>
            {stateOption}
        </div>
    )
}

export default StatePicker;