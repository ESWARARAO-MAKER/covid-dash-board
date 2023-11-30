import { Component } from "react";
import "./index.css"
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";





class Header extends Component{
    state = {
        isClicked : false,
    }
    tabItems = [
        {
            id:'home', 
            displayText : "Home",
        },
        {
            id : 'vaccination',
            displayText : 'Vaccination',
        },
        {
            id: 'about',
            displayText : 'About',
        },
    ]
    onClickHomeIcon = () => {
        this.setState((prevState) => {
            return (
                {
                    isClicked : !prevState.isClicked,
                }
            )
        })
    }
    onClickCancelIcon = () => {
        this.setState((prevState) => {
            return (
                {
                    isClicked : !prevState.isClicked,
                }
            )
        })
    }
    render(){
        const {activeTabId} = this.props
        const {isClicked} = this.state
        return(
            <>
                <nav className="navbar">
                    <div className="mobile-view">
                        <Link to = "/" className = "link-item">
                            <ul className="mobile-logo">
                                <li className="covid-name">COVID19</li>
                                <li className="india-name">INDIA</li>
                            </ul>
                        </Link>
                        <IoMenu className="home-icon" onClick={this.onClickHomeIcon} />
                    </div>
                    <div className="desktop-view">
                        <Link to = "/" className="link-item">
                            <ul className="desktop-logo">
                                <li className="covid-name">COVID19</li>
                                <li className="india-name">INDIA</li>
                            </ul>
                        </Link>
                        <ul className="icons-2">
                            <li>
                                <Link to = "/" className = {activeTabId === this.tabItems[0].id ? 'link-item active-class-name' : 'link-item'}>Home</Link>
                            </li>
                            <li>
                                <Link to = "/vaccination" className= {activeTabId === this.tabItems[1].id ? 'link-item active-class-name' : 'link-item'}>Vaccination</Link>
                            </li>
                            <li>
                                <Link to = '/about' className= {activeTabId === this.tabItems[2].id ? 'link-item active-class-name' : 'link-item'}>About</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {isClicked && (
                    <div className="navbar-below-mobile">
                        <ul className="mobile-below">
                            <li>
                                <Link to = "/" className= {activeTabId === this.tabItems[0].id ? 'link-item active-class-name' : 'link-item'}>Home</Link>
                            </li>
                            <li>
                                <Link to = "/vaccination" className= {activeTabId === this.tabItems[1].id ? 'link-item active-class-name' : 'link-item'}>Vaccination</Link>
                            </li>
                            <li>
                                <Link to = "/about" className= {activeTabId === this.tabItems[2].id ? "link-item active-class-name" : 'link-item'}>About</Link>
                            </li>
                        </ul>
                        <MdOutlineCancel className = 'cancel-icon' onClick={this.onClickCancelIcon}/>
                    </div>
                )}
            </>
        )
    }
}
export default Header;