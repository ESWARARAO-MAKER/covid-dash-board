/* eslint-disable react/no-unknown-property */
import './index.css'

const TopDistrictItems = props => {
  const {details, activeBox} = props
  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  const dataSortedFunction = () => {
    switch (activeBox) {
      case 'confirmed':
        return details.map(each => ({
          counts: each.districtWiseConfirmed
            ? internationalNumberFormat.format(each.districtWiseConfirmed)
            : 0,
          name1: each.districtName,
        }))
      case 'recovered':
        return details.map(each => ({
          counts: each.districtWiseRecovered
            ? internationalNumberFormat.format(each.districtWiseRecovered)
            : 0,
          name1: each.districtName,
        }))
      case 'deceased':
        return details.map(each => ({
          counts: each.districtWiseDeceased
            ? internationalNumberFormat.format(each.districtWiseDeceased)
            : 0,
          name1: each.districtName,
        }))
      case 'active':
        return details.map(each => ({
          counts: each.districtWiseActive
            ? internationalNumberFormat.format(each.districtWiseActive)
            : 0,
          name1: each.districtName,
        }))
      default:
        return null
    }
  }

  const dataSorted = dataSortedFunction()
  console.log(dataSorted)

  return (
    <ul className="top-districts-ul" testid="topDistrictsUnorderedList">
      {dataSorted.map(each => (
        <li className="top-districts-li" key={each.name1}>
          <p className="district-count">{each.counts}</p>
          <p>{each.name1}</p>
        </li>
      ))}
    </ul>
  )
}

export default TopDistrictItems