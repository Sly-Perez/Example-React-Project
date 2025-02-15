import logo from '../assets/images/logo.png';

function MainHeader() {
  return (
    <header>
        <div className="container">
            <div id="logo">
              <img src={logo} alt="" className="img-fluid" />
            </div>
        </div>
    </header>
  )
}

export default MainHeader;