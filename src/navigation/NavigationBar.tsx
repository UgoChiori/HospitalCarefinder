// import React , { useState, useEffect} from 'react';
// import { Link } from 'react-router-dom';
// import {CgDetailsMore} from 'react-icons/cg';
// import {ImCancelCircle} from 'react-icons/im';
// import { MdLogout } from 'react-icons/md';
// import {RiArrowDownSFill} from 'react-icons/ri';
// import {RxAvatar} from 'react-icons/rx';
// import "./navigationbar.css";
// import carefinderlogo from "../photos/carefinderlogo.jpg";



// interface User {
//     displayName: string;
//     photoUrl: string;
// }

// interface NavbarProps {
//     signOut: () => void;
//     user: User | null;
// }

// const NavigationBar: React.FC<NavbarProps> = ({ signOut, user }) => {
//     const [toggle, setToggle] = useState(false);
//     const [show, setShow] = useState(false);
//     const [open, setOpen] = useState<boolean>(false);
    
  
//     const [offset] = WindowOffSet();
  
//     const handleLinkClick = () => {
//       setOpen(false);
//     };
  
//     const handleHamburgerClick = () => {
//       setOpen(!open);
//     };
  
//     useEffect(() => {
//       if (open) {
//         setShow(false);
//       }
//     }, [open]);
  

//     return (
//         <nav className={offset > 20 ? "nav_container1" : "nav_container"}>
//           <div className="nav_wrapper">
//             <h1 className="nav_header">CareFinder. <img src={carefinderlogo} alt="logo" className="carefinderlogo" width={40} style={{background: "purple"}} /> </h1>
            
            
//             <div className={`nav_ul ${open ? "active" : ""}`}>
//               <ul>
//                 <li>
//                   <Link to="/" onClick={handleLinkClick}>
//                     Home
//                   </Link>
//                 </li>
//                 {user ? (
//                   <li>
//                     <div
//                       onClick={() => setShow(!show)}
//                       className={`app_navbar_profile ${show ? "active" : ""}`}
//                     >
//                       {user && (
//                         <div className="app_navbar_profile_flex">
//                           <img
//                             src={user.photoUrl}
//                             alt="profile"
//                             className="avatar"
//                           />
//                           <p>
//                             {user.displayName}
//                             <RiArrowDownSFill onClick={() => setToggle(!toggle)} />
//                           </p>
//                         </div>
//                       )}
//                       {toggle && (
//                         <ul id="dropdown_menu" >
//                           <li className="list-drop">
//                             <Link to="/profile" onClick={handleLinkClick}>
//                               <RxAvatar className="user_icon" />
//                               Profile
//                             </Link>
//                           </li>
//                           <li>
//                             <Link to="/" onClick={signOut}>
//                               <MdLogout className="user_icon" />
//                               Logout
//                             </Link>
//                           </li>
//                         </ul>
//                       )}
//                     </div>
//                   </li>
//                 ) : (
//                   <>
//                     <li>
//                       <Link to="/signin" onClick={handleLinkClick}>
//                         Login
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/register" onClick={handleLinkClick}>
//                         Register
//                       </Link>
//                     </li>
//                   </>
//                 )}
//                 <li>
//                   <Link to="/hospitals" onClick={handleLinkClick}>
//                     Hospitals
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div className="nav_icons">
//               {open ? (
//                 <ImCancelCircle
//                   className="nav_icon"
//                   onClick={handleHamburgerClick}
//                 />
//               ) : (
//                 <CgDetailsMore
//                   className="nav_icon"
//                   onClick={handleHamburgerClick}
//                 />
//               )}
//             </div>
//           </div>
//         </nav>
//       );
//     };
    
//     export default NavigationBar;
    
//     function WindowOffSet() {
//       const [offset, setOffSet] = useState<number>(0);
    
//       useEffect(() => {
//         window.onscroll = () => {
//           setOffSet(window.scrollY);
//         };
//       }, []);
    
//       return [offset] as const;
//     }
    
    

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CgDetailsMore } from 'react-icons/cg';
import { ImCancelCircle } from 'react-icons/im';
import { MdLogout } from 'react-icons/md';
import { RiArrowDownSFill } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import './navigationbar.css';
import carefinderlogo from '../photos/carefinderlogo.jpg';

interface User {
  displayName: string;
  photoUrl: string;
}

interface NavbarProps {
  signOut: () => void;
  user: User | null;
}

const NavigationBar: React.FC<NavbarProps> = ({ signOut, user }) => {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [offset] = WindowOffSet();

  const handleLinkClick = () => {
    setOpen(false);
  };

  const handleHamburgerClick = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (open) {
      setShow(false);
    }
  }, [open]);

  return (
    <nav className={offset > 20 ? 'nav_container1' : 'nav_container'}>
      <div className="nav_wrapper">
        <h1 className="nav_header">
          CareFinder.{' '}
          <img src={carefinderlogo} alt="logo" className="carefinderlogo" width={40} style={{ background: 'purple' }} />
        </h1>

        <div className={`nav_ul ${open ? 'active' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Home
              </Link>
            </li>
            {user ? (
              <li>
                <div onClick={() => setShow(!show)} className={`app_navbar_profile ${show ? 'active' : ''}`}>
                  {user && (
                    <div className="app_navbar_profile_flex">
                      <img src={user.photoUrl} alt="profile" className="avatar" />
                      <p>
                        {user.displayName}
                        <RiArrowDownSFill onClick={() => setToggle(!toggle)} />
                      </p>
                      {toggle && (
                        <ul id="dropdown_menu">
                          <li className="list-drop">
                            <Link to="/profile" onClick={handleLinkClick}>
                              <RxAvatar className="user_icon" />
                              Profile
                            </Link>
                          </li>
                          <li>
                            <Link to="/" onClick={signOut}>
                              <MdLogout className="user_icon" />
                              Logout
                            </Link>
                          </li>
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/signin" onClick={handleLinkClick}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={handleLinkClick}>
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link to="/hospitals" onClick={handleLinkClick}>
                Hospitals
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav_icons">
          {open ? (
            <ImCancelCircle className="nav_icon" onClick={handleHamburgerClick} />
) : (
<CgDetailsMore className="nav_icon" onClick={handleHamburgerClick} />
)}
</div>
</div>
</nav>
);
};
export default NavigationBar;

function WindowOffSet() {
const [offset, setOffSet] = useState<number>(0);

useEffect(() => {
window.onscroll = () => {
setOffSet(window.scrollY);
};
}, []);

return [offset] as const;
}