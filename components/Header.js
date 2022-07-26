import React from 'react'
import app from '../firebase'
import Image from 'next/image'
import Link from 'next/link'
import { ViewGridIcon } from '@heroicons/react/solid'
import { useSelector } from 'react-redux'
import { loginActions } from '../store'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useDispatch } from 'react-redux'

function Header() {
    const provider = new GoogleAuthProvider();
    const user = useSelector((state) => {
        const userInfo = { login: state.login.isLogedIn, url: state.login.profilePic }
        return userInfo;
        console.log("file: Header.js ~ line 16 ~ user ~ userInfo", userInfo);
    });
    const dispatch = useDispatch();

    function loginUser() {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log(user);
                console.log(user.photoURL);
                // url = user.photoURL;

                dispatch(loginActions.Login(user.photoURL));
                // ...

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    return (
        <header className='flex justify-between p-4 text-gray-600 items-center' >
            {/* {left} */}
            <div className='flex gap-5'>
                <p className='link'><Link href={'https://about.google/l'} >About</Link></p>
                <p className='link'><Link href={'https://store.google.com/'} >Store</Link></p>
            </div>
            {/* {right} */}
            <div className='flex gap-5 items-center'>
                <p className='link'><Link href={'#'} >Gmail</Link></p>
                <p className='link'><Link href={'#'} >Images</Link></p>

                {/* <ViewGridIcon className="h-10 w-10 text-gray-500 hover:bg-gray-100 rounded-full cursor-pointer p-1" /> */}

                <svg class="gb_Ue h-6" focusable="false" viewBox="0 0 24 24"><path d="M6,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM6,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM12,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM16,6c0,1.1 0.9,2 2,2s2,-0.9 2,-2 -0.9,-2 -2,-2 -2,0.9 -2,2zM12,8c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,14c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2zM18,20c1.1,0 2,-0.9 2,-2s-0.9,-2 -2,-2 -2,0.9 -2,2 0.9,2 2,2z"></path></svg>


                {user.login && <img src={user.url} alt="profile-pic " className='h-9 rounded-full cursor-pointer transition ease-in-out delay-150  hover:-translate-x-1 hover:scale-110  duration-300 ' />}
                {!user.login && <button onClick={loginUser} className='border p-1 rounded-md transition ease-in-out delay-150  hover:-translate-x-1 hover:scale-110  duration-300 bg-blue-500 text-white w-14'>LogIn</button>}
            </div>

        </header>
    )
}

export default Header