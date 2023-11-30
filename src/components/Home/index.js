import { Component } from "react"
import "./index.css"
import Header from "../Header";
import { BsSearch } from "react-icons/bs";
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc';
import statesList from "../../states";
import EachStateSuggestion from "../EachStateSuggestion";
import Footer from "../Footer";
import EachRow from "../EachRow";
import {Bars} from "react-loader-spinner";


const apiStatusConstants = {
    initial : 'INITIAL',
    success : 'SUCCESS',
    failure : 'FAILURE',
    inProgress : 'IN_PROGRESS',
}


class Home extends Component{

    state = {
        resultList : [],
        isSearchActive : false,
        searchInput : "",
        apiStatus : apiStatusConstants.initial,
    }

    componentDidMount() {
        this.getAllStatesCovidCases();
    }


    onChangeSearchInput = (event) => {
        event.preventDefault()
        this.setState({
            searchInput : event.target.value,
            isSearchActive : true,
        })
    }

    convertObjectsDataIntoListItemsUsingForInMethod = data => {
        const resultList = []
        const keyNames = Object.keys(data)
        keyNames.forEach(keyName => {
          if (data[keyName]) {
            const {total} = data[keyName]
            const confirmed = total.confirmed ? total.confirmed : 0
            const deceased = total.deceased ? total.deceased : 0
            const recovered = total.recovered ? total.recovered : 0
            const tested = total.tested ? total.tested : 0
            const population = data[keyName].meta.population
              ? data[keyName].meta.population
              : 0
            const stateName = [
              statesList.find(state => state.state_code === keyName),
            ]
            if (stateName[0]?.state_name !== undefined) {
              resultList.push({
                stateCode: keyName,
                confirmed,
                name: stateName[0]?.state_name,
                deceased,
                recovered,
                tested,
                population,
                active: confirmed - (deceased + recovered),
              })
            }
          }
        })
        return resultList
      }


      getAllStatesCovidCases = async () => {
        this.setState({apiStatus: apiStatusConstants.inProgress})
        const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
        const options = {
          method: 'GET',
        }
    
        const response = await fetch(apiUrl, options)
        if (response.ok === true) {
          const data = await response.json()
          const updatedList = this.convertObjectsDataIntoListItemsUsingForInMethod(
            data,
          )
          this.setState({
            resultList: updatedList,
            apiStatus: apiStatusConstants.success,
          })
        } else {
          this.setState({apiStatus: apiStatusConstants.failure})
        }
      }



    renderTable = () => {
        const {resultList} = this.state;
        return (
            <tbody>
                {resultList.map((each) => (
                    <EachRow key = {each.stateCode} details = {each} />
                ))}
            </tbody>
        )
    }



    renderFailureView = () => (
        <div className="failure-view">
            <img src = "https://assets.ccbp.in/frontend/react-js/failure-img.png" alt = "failure view" className="fail-image"/>
            <p>Oops! Something Went Wrong</p>
            <button className="retry-btn" type = "button" onClick = {this.getAllStatesCovidCases}>Retry</button>
        </div>
    )


    renderLoadingView = () => (
        <div className="products-loader-container" testid = "homeRouterLoader">
           <Bars type = "Oval" color="#007bff" height="50" width="50"/> 
        </div>
    )




    onClickAsSortOption = () => {
        const {resultList} = this.state;
        function compare(a,b) {
            if (a.name < b.name){
                return -1
            }
            return 0;
        }
        const sortedData = resultList.sort(compare)
        this.setState({resultList : sortedData})
    }

    onClickDescSortOption = () => {
        const {resultList} = this.state;
        function compare(a,b){
            if (a.name > b.name){
                return -1;
            }
            return 0;
        }
        const sortedData = resultList.sort(compare)
        this.setState({resultList : sortedData})
    }


    renderTableView = () => (
        <div className="table-design" testid="stateWiseCovidDataTable">
          <table className="users_table" testid="stateWiseCovidDataTable">
            <thead className="thead">
              <tr>
                <th>
                  <div className="sort-sec">
                    <p>States/UT</p>
                    <button
                      type="button"
                      testid="ascendingSort"
                      className="sort-btn"
                      onClick={this.onClickAscSortOption}
                    >
                      <FcGenericSortingAsc className="sort-icon" />
                    </button>
                    <button
                      className="sort-btn"
                      tested="descendingSort"
                      type="button"
                      onClick={this.onClickDescSortOption}
                    >
                      <FcGenericSortingDesc className="sort-icon" />
                    </button>
                  </div>
                </th>
                <th>Confirmed</th>
                <th>Active</th>
                <th>Recovered</th>
                <th>Deceased</th>
                <th>Population</th>
              </tr>
            </thead>
            {this.renderTable()}
          </table>
        </div>
      )

    renderAll = () => {
        const {apiStatus} =  this.state;
        switch (apiStatus) {
            case apiStatusConstants.success:
                return this.renderTableView()
            case apiStatusConstants.failure:
                return this.renderFailureView()
            case apiStatusConstants.inProgress:
                return this.renderLoadingView()
            default: 
                return null;
        }
    }

    render(){
        const internationalNumberFormat = new Intl.NumberFormat('en-US');
        const {isSearchActive, searchInput, resultList} = this.state;
        const countryWideConfirmedCasesCount = resultList.reduce(
            (prev, current) => prev+current.recovered,
            0,
        );
        const countryWideRecoveredCasesCount = resultList.reduce(
            (prev, current) => prev + current.recovered,
            0,
        );
        const countryWideDeceasedCasesCount = resultList.reduce(
            (prev, current) => prev + current.deceased,
            0,
        );
        const countryWideActiveCasesCount = resultList.reduce(
            (prev, current) => prev + current.active, 
            0,
        );
        const searchResults = statesList.filter(
            each => 
            each.state_name.toLowerCase().includes(searchInput.toLowerCase()) ||
            each.state_code.toLowerCase().includes(searchInput.toLowerCase()),
        )
        return(
            <>
                <Header activeTabId = 'home'/>
                <div className="home-bg" onClick={() => {
                    this.setState({
                        isSearchActive : false,
                        searchInput : "",
                    })
                }} aria-hidden = "true">
                    <div className="search-box-cont">
                        <BsSearch />
                        <input value={searchInput} type="search" className="search-box" onChange={this.onChangeSearchInput}/>
                    </div>
                    {isSearchActive ? (
                        <ul className="search-list-section" testid = "searchResultsUnorderedList">
                            {searchResults.length === 0 ? (
                                <p className="no-results-section">
                                    There is no State Name with your Search {searchInput}
                                </p>
                            ):(
                                searchResults.map(each => (
                                    <EachStateSuggestion key = {each.state_code} details = {each} />
                                ))
                            )}
                        </ul>
                    ) : (
                        <div className="home-icons-section">
                            <div className="section1">
                                <div className="confirmed" testid = "countryWideConfirmedCases">
                                    <p>confirmed</p>
                                    <img src = "https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/Group_rtygto.png" alt = "country wide confirmed cases pic" className="confirmed-image"/>
                                    <p>
                                       {internationalNumberFormat.format(
                                        countryWideConfirmedCasesCount,
                                       )} 
                                    </p>
                                </div>
                                <div className="active" testid = 'countryWideActiveCases'>
                                    <p>Active</p>
                                    <img src = "http://res.cloudinary.com/dbphffmis/image/upload/v1637413101/protection_1_btp8wk.png" alt = "country wide active cases pic" className="confirmed-image" />
                                    <p>
                                        {internationalNumberFormat.format(
                                            countryWideActiveCasesCount,
                                        )}
                                    </p>
                            </div>
                        </div>
                        <div className="section1">
                            <div className="recovered" testid = "countryWideRecoveredCases">
                                <p>Recovered</p>
                                <img src = "https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/recovered_1_mnz2xy.png" alt= "country wide recovered cases pic" className="confirmed-image"/>
                                <p>
                                    {internationalNumberFormat.format(
                                        countryWideRecoveredCasesCount,
                                    )}
                                </p>
                            </div>
                            <div className="deceased" testid = "countryWideDeceasedCases">
                                <p>Deceased</p>
                                <img src = "https://res.cloudinary.com/dbphffmis/image/upload/v1637413101/Outline_fqrmo2.png" alt = "country wide deceased cases pic" className="confirmed-image"/>
                                <p>
                                    {internationalNumberFormat.format(
                                        countryWideDeceasedCasesCount,
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    )}
                    {!isSearchActive && this.renderAll()}
                </div>
                <Footer />
            </>
        
        )
    }
}
export default Home;