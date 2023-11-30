/* eslint-disable react/no-unused-state */
import {Component} from 'react'
import {AiFillHome} from 'react-icons/ai'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Vaccination extends Component {
  state = {
    stateNamesList: [],
    activeStateId: 0,
    districtNamesList: [],
    activeDistrictId: 0,
    vaccinationConducting: [],
  }

  componentDidMount() {
    this.getStateNamesList()
    this.getVaccinationApi()
  }

  getVaccinationApi = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/covid19-vaccination-data',
    )
    const data = await response.json()
    this.setState({vaccinationConducting: data?.topBlock})
  }

  getStateNamesList = async () => {
    const url = 'https://apis.ccbp.in/covid19-state-ids/'
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const a = data?.states.map(each => ({
        stateId: each.state_id,
        stateName: each.state_name,
      }))
      this.setState({stateNamesList: a})
    }
  }

  getDistrictNamesList = async value => {
    const url = `https://apis.ccbp.in/covid19-districts-data/${value}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const a = data?.districts.map(each => ({
        districtId: each.district_id,
        districtName: each.district_name,
      }))
      this.setState({districtNamesList: a})
    }
  }

  handleStateNameChange = event => {
    event.preventDefault()
    this.getDistrictNamesList(event.target.value)
    this.setState({activeStateId: event.target.value})
  }

  handleDistrictNameChange = event => {
    event.preventDefault()
    this.setState({activeDistrictId: event.target.value})
  }

  render() {
    const internationalNumberFormat = new Intl.NumberFormat('en-US')
    const {
      vaccinationConducting,
      stateNamesList,
      districtNamesList,
      activeStateId,
    } = this.state
    const stateName = stateNamesList.find(
      each => each.stateId === activeStateId,
    )
    const {sites, vaccination} = vaccinationConducting
    return (
      <>
        <Header activeTabId="vaccination" />
        <div className="vaccination-body">
          <div className="state-name-section">
            <AiFillHome />
            <p className="state-name">India/{stateName?.stateName}</p>
          </div>
          <div className="select-boxes">
            <FormControl id="ss">
              <InputLabel id="label-text">Select State</InputLabel>
              <Select
                onChange={this.handleStateNameChange}
                labelId="demo-simple-select-label"
                id="label-text"
                label="Select State"
              >
                {stateNamesList.map(each => (
                  <MenuItem key={each.stateId} value={each.stateId}>
                    {each.stateName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl id="ss">
              <InputLabel id="label-text">Select District</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                onChange={this.handleDistrictNameChange}
                id="label-text"
                label="Select District"
              >
                {districtNamesList.map(each => (
                  <MenuItem key={each.districtId} value={each.districtId}>
                    {each.districtName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="box-section">
            <div className="v-box1">
              <img
                src="https://res.cloudinary.com/dbphffmis/image/upload/v1642174208/Group_7476_1_vdzbhq.png"
                alt="dd"
                className="v-img"
              />
              <div className="inner">
                <p>Site Conducting Vaccinations</p>
                <p>{internationalNumberFormat.format(sites?.total)}</p>
                <div className="d-flex">
                  <div>
                    <p>Government</p>
                    <p>{internationalNumberFormat.format(sites?.govt)}</p>
                  </div>
                  <div>
                    <p>Private</p>
                    <p>{internationalNumberFormat.format(sites?.pvt)}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="v-box2">
              <img
                src="https://res.cloudinary.com/dbphffmis/image/upload/v1642174208/Group_7476_riruum.png"
                alt="dd"
                className="v-img"
              />
              <div className="inner">
                <p>Total Vaccination Doses</p>
                <p>{internationalNumberFormat.format(vaccination?.total)}</p>
                <div className="d-flex">
                  <div>
                    <p>Dose1</p>
                    <p>
                      {internationalNumberFormat.format(
                        vaccination?.tot_dose_1,
                      )}
                    </p>
                  </div>
                  <div>
                    <p>Dose2</p>
                    <p>
                      {internationalNumberFormat.format(
                        vaccination?.tot_dose_2,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default Vaccination