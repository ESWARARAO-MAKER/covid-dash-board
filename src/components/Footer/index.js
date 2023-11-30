import "./index.css"
import {FiInstagram} from 'react-icons/fi';
import {FaTwitter} from 'react-icons/fa';
import {VscGithubAlt}  from 'react-icons/vsc';
const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-logo">
                <h1 className="covid-name-footer">COVID19</h1>
                <h1 className="india-name-footer">INDIA</h1>
            </div>
            <p className="footer-tag">
                We stand with everyone fighting on the front lines
            </p>
            <div className="footer-icons-section">
                <VscGithubAlt className ="footer-icon" />
                <FiInstagram className = "footer-icon" />
                <FaTwitter className = "footer-icon" />
            </div>
        </div>
    )
}
export default Footer;
