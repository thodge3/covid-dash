import React, { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';

import styles from './CountryPicker.module.css';

import { fetchNewCountries } from '../../api';

const CountryPicker = ({ handleCountryChange }) =>{
    // const [fetchedCountries, setFetchedCountries] = useState([]);
    const [fetchedNewCountries, setFetchedNewCountries] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            // setFetchedCountries(await fetchCountries())
            setFetchedNewCountries(await fetchNewCountries());
        }

        fetchAPI();
    }, [setFetchedNewCountries])

    //console.log(fetchedCountries);

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="" onChange={(e) => handleCountryChange(e.target.value)}>
                <option value="global">Global</option>
                <option value="united-states">United States of America</option>
                {fetchedNewCountries.filter(data => data.slug !== 'united-states').map((country, i) => <option key={i} value={country.slug}>{country.country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;