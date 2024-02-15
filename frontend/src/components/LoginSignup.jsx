// import React, { useState } from 'react';
// import { GoogleLogin } from '@react-oauth/google';

// import './LoginSignup.css'; // Import your custom CSS

// import user_icon from '../Assets/person.png';
// import email_icon from '../Assets/email.png';
// import password_icon from '../Assets/password.png';

// const LoginSignup = () => {
//   const [action, setAction] = useState('Login');
//   return (
//     <div className='container'>
//       <div className='header'>
//         <div className="text">{action}</div>
//         <div className='underline'></div>
//       </div>
//       <div className="inputs">
//         {action === "Login" ? null : (
//           <div className="input">
//             <img src={user_icon} alt="" />
//             <input type="text" placeholder="Name" />
//           </div>
//         )}

//         <div className="input">
//           <img src={email_icon} alt="" />
//           <input type="email" placeholder="Email Id" />
//         </div>

//         <div className="input">
//           <img src={password_icon} alt="" />
//           <input type="password" placeholder="Password" />
//         </div>
//         {action === "Sign Up" ? null : (
//           <div className="forgot-password">Forgot Password? <span>Click here</span>
//           </div>
//         )}
//         {/* Google Login Button */}
//         {action === "Login" && (
//           <div className="google-login">
//             <GoogleLogin
//               onSuccess={credentialResponse => {
//                 console.log(credentialResponse);
//               }}
//               onError={() => {
//                 console.log('Login Failed');
//               }}
//             />
//           </div>
//         )}
//         <div className="submit-container">
//           <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
//           <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login") }}>Login</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LoginSignup;
import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

const LoginSignup = () => {
  const [action, setAction] = useState('Login');
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100"> {/* Set background color and center content */}
      <div className="container w-96 p-12 bg-white rounded-lg shadow-md"> {/* Adjust container size and styling */}
        <div className="header mb-6">
          <div className="text text-3xl font-semibold text-purple-700">{action}</div>
          <div className="underline h-1 bg-purple-700 mt-2"></div>
        </div>
        <div className="inputs space-y-4">
          {action === "Login" ? null : (
            <div className="input flex items-center space-x-2">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Name" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            </div>
          )}

          <div className="input flex items-center space-x-2">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email Id" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>

          <div className="input flex items-center space-x-2">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          {action === "Sign Up" ? null : (
            <div className="forgot-password text-sm text-purple-500 mt-2">Forgot Password? <span className="cursor-pointer">Click here</span>
            </div>
          )}
          {/* Google Login Button */}
          {action === "Login" && (
            <div className="google-login mt-4">
              <GoogleLogin
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </div>
          )}
          <div className="submit-container flex space-x-4 mt-4">
            <div className={`submit w-full py-2 text-center rounded-lg cursor-pointer ${action === "Login" ? "bg-gray-200" : "bg-purple-600 text-white"}`} onClick={() => { setAction("Sign Up") }}>Sign Up</div>
            <div className={`submit w-full py-2 text-center rounded-lg cursor-pointer ${action === "Sign Up" ? "bg-gray-200" : "bg-purple-600 text-white"}`} onClick={() => { setAction("Login") }}>Login</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
