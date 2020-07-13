import React from 'react';

// import Cards from './components/Cards';
// import Chart from './components/Chart';
// import CountryPicker from './components/CountryPicker';

import { Cards, UsChart, CountryPicker } from './components';
import styles from './App.module.css'
import { fetchData, fetchGitData, fetchNewData, fetchNewCountries } from './api';
import moment from 'moment';

import coronaImage from './images/image.png';

class App extends React.Component {

  state = {
    data: {},
    countries: {},
    cardData: {},
    usData: {},
    country: 'global',
    countryName: 'Global',

  }

  async componentDidMount() {
    const fetchedData = await fetchNewData('');
    const cardData = await fetchData();
    const fetchedGitData = await fetchGitData();
    const countries = await fetchNewCountries();

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
  }

  handleCountryChange = async (country) => {
    // const fetchedData = await fetchData(country);
    let fetchedData;
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

  // <Chart data={ data } country={ country }/>


  render() {
    const { data, country, cardData, countryName } = this.state;

    return (
      <div className={styles.container}>
        <img src={coronaImage} className={styles.image} alt='COVID-19' />
        <Cards cardData={cardData} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <UsChart data={data} country={country} countryName={countryName} />
      </div>
    )
  }
}

export default App;
