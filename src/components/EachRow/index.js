import {Link} from 'react-router-dom'

const EachRow = props => {
  const {details} = props
  const {
    confirmed,
    name,
    active,
    deceased,
    recovered,
    population,
    stateCode,
  } = details
  console.log(typeof confirmed)
  const internationalNumberFormat = new Intl.NumberFormat('en-US')
  return (
    <tr>
      <td className="tro">
        <Link to={`/state/${stateCode}`} className="link-item">
          {name}
        </Link>
      </td>
      <td className="tr1">{internationalNumberFormat.format(confirmed)}</td>
      <td className="tr2">{internationalNumberFormat.format(active)}</td>
      <td className="tr3">{internationalNumberFormat.format(recovered)}</td>
      <td className="tr4">{internationalNumberFormat.format(deceased)}</td>
      <td className="tr4">{internationalNumberFormat.format(population)}</td>
    </tr>
  )
}

export default EachRow