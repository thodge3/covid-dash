import React from 'react';

// import Cards from './components/Cards';
// import Chart from './components/Chart';
// import CountryPicker from './components/CountryPicker';

import { Cards, UsChart, CountryPicker, StatePicker } from './components';
import styles from './App.module.css'
import { fetchData, fetchGitData, fetchNewData, fetchNewCountries, fetchStateInfo, fetchStateData } from './api';
import moment from 'moment';
import ReactJoyride from 'react-joyride';

import coronaImage from './images/image.png';
import StateChart from './components/StateCharts/StateChart';

class App extends React.Component {

  state = {
    data: {},
    countries: {},
    cardData: {},
    usData: {},
    country: 'global',
    countryName: 'Global',
    state: null,
    stateDisplay: null,
    stateMeta: null,
    stateData: null,
    steps: [],
  }

  async componentDidMount() {
    const fetchedData = await fetchNewData('');
    const cardData = await fetchData();
    const fetchedGitData = await fetchGitData();
    const countries = await fetchNewCountries();
    const stateInfo = await fetchStateInfo();

    this.setState({ data: fetchedData });
    this.setState({ usData: fetchedGitData });
    this.setState({ countries: countries })
    this.setState({
      cardData: {
        confirmed: cardData.confirmed.value,
        recovered: cardData.recovered.value,
        deaths: cardData.deaths.value,
        lastUpdate: moment.utc(cardData.lastUpdate).format('LL'),
      }
    })
    this.setState({
      stateMeta: stateInfo,
    })
    this.setState({
      steps: [
        {
          target: '.CountryPicker_formControl__OBg0y',
          content: "Select United States for State Information!"
        }
      ]
    })
  }

  handleCountryChange = async (country) => {
    // const fetchedData = await fetchData(country);
    let fetchedData;

    if(country === 'united-states') {
      this.handleStateChange('ak');
    }

    if (country === 'global') {
      fetchedData = await fetchNewData('');
      let cardData = await fetchData();
      this.setState({
        cardData: {
          confirmed: cardData.confirmed.value,
          recovered: cardData.recovered.value,
          deaths: cardData.deaths.value,
          lastUpdate: moment.utc(cardData.lastUpdate).format('LL'),
        }
      })
      this.setState({ data: fetchedData, country: country, countryName: 'Global' });
    } else {
      fetchedData = await fetchNewData(country);

      let cardInit = fetchedData[fetchedData.length - 1]
      let cardDataMod = {}
      try {
        cardDataMod = {
          lastUpdate: cardInit.date,
          confirmed: cardInit.positive,
          recovered: cardInit.recovered,
          deaths: cardInit.deaths,
        }
        this.setState({ cardData: cardDataMod })
      } catch (error) {
        console.log(error)
      }

      try {
        let cn = this.state.countries.filter(item => item.slug === country)
        this.setState({ countryName: cn[0].country })
      } catch (error) {
        this.setState({ countryName: 'Global' })
        console.log(error)
      }
      this.setState({ data: fetchedData, country: country });
    }

  }

  handleStateChange = async (state) => {

    let check = this.state.stateMeta.filter(data => data.state === state)
    let name = check.pop().displayName
    const stateData = await fetchStateData(state);

    this.setState({
      state: state,
      stateDisplay: name,
      stateData: stateData,
    })
  }

  // <Chart data={ data } country={ country }/>


  render() {
    const { data, country, cardData, countryName, state, stateDisplay, stateData } = this.state;

    return (
      <div className={styles.container}>
        <ReactJoyride
          steps={this.state.steps}
        />
        <img src={coronaImage} className={styles.image} alt='COVID-19' />
        <Cards cardData={cardData} />
        <CountryPicker handleCountryChange={this.handleCountryChange} id='check'/>
        <UsChart data={data} country={country} countryName={countryName} />
        <StatePicker country={country} handleStateChange={this.handleStateChange}/>
        <StateChart state={state} stateData={stateData} stateDisplay={stateDisplay} country={country}/>
      </div>
    )
  }
}

export default App;
