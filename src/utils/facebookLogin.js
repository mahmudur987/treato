import 'regenerator-runtime/runtime'
import { facebookAuth } from '../services/auth';
import { updateIsLoggedIn, updateUserDetails } from '../redux/slices/user';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const FB_ID = process.env.REACT_APP_FACEBOOK_APP_ID;
const redirectUri = "https://treato.netlify.app"; // tricky test.
const getUrlParameter = (e, uri) => {
    e = e.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var t = new RegExp("[\\?&]" + e + "=([^&#]*)").exec(uri); return null === t ? null : decodeURIComponent(t[1].replace(/\+/g, " "))
}
const buildUrlFb = () => {
    let params = "fbloged=1";
    let uriX2 = encodeURIComponent(redirectUri);
    console.log(":rocket: ~ file: Login.js:21 ~ buildUrlFb ~ uriX2:", uriX2)
    return (`https://www.facebook.com/v13.0/dialog/oauth?client_id=${FB_ID}&redirect_uri=${uriX2}&state=${params}`);
}
const popupWindow = (url, windowName, win, w, h) => {
    const y = win.top.outerHeight / 2 + win.top.screenY - (h / 2);
    const x = win.top.outerWidth / 2 + win.top.screenX - (w / 2);
    return win.open(url, windowName, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
}
export const openFbDialog = async () => {
    return new Promise((resolve, reject) => {
        let uri = buildUrlFb();
        let window01 = popupWindow(uri, "", window, 500, 500);
        // fire this immediately after the user accept the logged in
        window01.addEventListener("load", async (event) => {
            try {
                let uri02 = window01.location.href;
                let token = getUrlParameter("code", uri02);
                console.log(":rocket: ~ file: Login.js:40 ~ window01.addEventListener ~ token:", token)
                resolve(token);
                window01.close();
            } catch (ex) {
                console.log(":rocket: ~ file: Login.js:44 ~ window01.addEventListener ~ ex:", ex)
                reject(null);
            }
        });
    });
}
export const myFbLogin = async (dispatch) => {
    try {
        let token = await openFbDialog();
        
        console.log(":rocket: ~ file: Login.js:51 ~ myFbLogin ~ token:", token)
        facebookAuth(token,redirectUri).then((res)=>{
            const navigate = useNavigate();
            console.log("manual fb login",res);
            if(res?.res?.data?.data){

                dispatch(updateIsLoggedIn(true));
                dispatch(
                  updateUserDetails(res?.res?.data?.newUser || res?.res?.data.user)
                );
                localStorage.setItem("jwtToken", res?.res?.data?.token);
                navigate("/");
                toast("Welcome to Treato! Start exploring now!");
            }
            else{
                toast.error(`An unexpected error occurred. Please try again.`);
            }
        })

    } catch (ex) {
        console.log("there was an error");
    }
}