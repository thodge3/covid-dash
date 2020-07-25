import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';

const url = 'https://covid19.mathdro.id/api';
const allCountriesUrl = 'https://api.covid19api.com'

const urlJHU = 'https://covidtracking.com/api';

export const fetchNewCountries = async() => {
    let changeableUrl = allCountriesUrl;

    changeableUrl = `${allCountriesUrl}/countries`

    try{
        const { data } = await axios.get(changeableUrl);
        let modifiedData = data.map((step) => ({ 
            country: step.Country,
            slug: step.Slug,
            iso: step.ISO2,
         }));

        modifiedData = _.orderBy(modifiedData, ['country'],['asc']);
        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchNewGlobal = async() => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({ 
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
         }));

         return modifiedData
    } catch (error) {
        console.log(error)
    }
}

export const fetchNewData = async(country) => {
    let changeableUrl = allCountriesUrl;

    if (country === ''){
        try {
            const { data } = await axios.get(`${url}/daily`);
            const modifiedData = data.map((dailyData) => ({ 
                positive: dailyData.confirmed.total,
                deaths: dailyData.deaths.total,
                recovered: dailyData.recovered.total,
                date: moment.utc(dailyData.reportDate).format('LL'),
             }));
    
             return modifiedData
        } catch (error) {
            console.log(error)
        }
    } else if (country === 'united-states'){
        try{
            const { data } = await axios.get(`${urlJHU}/us/daily/`);
            const modifiedData = data.map((step) => ({ 
                date: moment(step.date, 'YYYYMMDD').format('LL'),
                timestamp: moment(step.date).format('x'),
                positive: step.positive,
                positiveIncrease: step.positiveIncrease,
                recovered: step.recovered,
                deaths: step.death,
             }));
    
            return _.orderBy(modifiedData, ['timestamp'], ['asc']);
    
        } catch (error) {
            console.log(error)
        }
    }else{
        changeableUrl = `${allCountriesUrl}/total/country/${country}`
    }

    try{
        const { data } = await axios.get(changeableUrl);
        const modifiedData = data.map((step) => ({ 
            date: moment.utc(step.Date).format('LL'),
            positive: step.Confirmed,
            recovered: step.Recovered,
            deaths: step.Deaths,
         }));
        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchGitData = async() => {
    let changeableUrl = urlJHU;

    changeableUrl = `${urlJHU}/us/daily/`

    try{
        const { data } = await axios.get(changeableUrl);
        const modifiedData = data.map((step) => ({ 
            date: moment(step.date, 'YYYYMMDD').format('LL'),
            positive: step.positive,
            positiveIncrease: step.positiveIncrease,
            recovered: step.recovered,
            deaths: step.death,
         }));

        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchData = async(country) => {
    let changeableUrl = url;

    if(country){
        changeableUrl = `${url}/countries/${country}`
    }

    try{
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);
        const modifiedData = {
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        }
        
        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData) => ({ 
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
         }));

         return modifiedData
    } catch (error) {
        console.log(error)
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${url}/countries`);

        return countries.map((country) => country.name )
    } catch (error) {
        console.log(error)
    }
}

export const fetchStateInfo = async() => {
    let changeableUrl = urlJHU;

    changeableUrl = `${urlJHU}/v1/states/info.json`

    try{
        const { data } = await axios.get(changeableUrl);
        const modifiedData = data.map((data) => ({
            displayName: data.name,
            state: data.state.toLowerCase(),
        }))
        /*
        const modifiedData = data.map((step) => ({ 
            date: moment(step.date, 'YYYYMMDD').format('LL'),
            positive: step.positive,
            positiveIncrease: step.positiveIncrease,
            recovered: step.recovered,
            deaths: step.death,
         }));
         */

        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}

export const fetchStateData = async(state) => {
    let changeableUrl = urlJHU;

    changeableUrl = `${urlJHU}/v1/states/${state}/daily.json`

    try{
        const { data } = await axios.get(changeableUrl);
        const modifiedData = data.map((step) => ({ 
            date: moment(step.date, 'YYYYMMDD').format('LL'),
            positive: step.positive,
            positiveIncrease: step.positiveIncrease,
            recovered: step.recovered,
            deaths: step.death,
         }));
        return modifiedData;

    } catch (error) {
        console.log(error)
    }
}


