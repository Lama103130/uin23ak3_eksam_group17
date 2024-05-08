import React,{useState} from 'react'
// import { RxAvatar } from "react-icons/rx";
// import { RxDesktop } from "react-icons/rx";


const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
  <header>
      <div className='logo'>
        <a href='/home'>What to see?</a>  
      </div>
      <nav>
        <ul>
          <li>
            <button>
              <a href='/catch_up'>
                {/* <RxDesktop /> */}
                <span>Hva skai jeg se?</span>
              </a>
            </button>
          </li>
          <li><a href='/bla'>bla gjennom sjangere</a></li>
          <li>  
            {/* <RxAvatar /> */}
            <span> user </span>
          </li>
        </ul>
      </nav>
      <div className='mobile_menu'>
        <button onClick={toggleVisibility}>Menu</button>
        {isVisible && (
        <div className='mobile_menu_container'>
           <ul>
            <li>
              <button>
                <a href='/catch_up'>
                  {/* <RxDesktop /> */}
                  <span>Hva skai jeg se?</span>
                </a>
              </button>
            </li>
            <li><a href='/bla'>bla gjennom sjangere</a></li>
            <li>  
              {/* <RxAvatar /> */}
              <span> user </span>
            </li>
          </ul>
        </div>
      )}
      </div>
  </header>
  )
}

export default Header