import styles from "./SocialSettings.module.css";
import facebook from "../../../assets/images/AccountSettings/facebook.webp";
import instagram from "../../../assets/images/AccountSettings/Instagram.webp";
import google from "../../../assets/images/AccountSettings/google.webp";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import {
  updateIsLoggedIn,
  updateUserDetails,
} from "../../../redux/slices/user";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { facebook_Login, google_Login } from "../../../services/auth";
import { LoginSocialFacebook } from "reactjs-social-login";
import { memo } from "react";

export default function SocialSettings({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userChoice = useSelector((state) => state.authChoice);
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const googleAuthLogin = useGoogleLogin({
    cookiePolicy: "single_host_origin",
    onSuccess: async (response) => {
      try {
        const { access_token } = response;
        // Make a request to your backend API
        google_Login(access_token).then((res) => {
          if (res?.res?.data && res?.res.status === 200) {
            dispatch(updateIsLoggedIn(true));
            dispatch(
              updateUserDetails(res?.res?.data?.newUser || res?.res?.data.user)
            );
            localStorage.setItem("jwtToken", res?.res?.data?.token);

            toast("Welcome to Treato! Start exploring now!");
          } else {
            toast.error(`An unexpected error occurred. Please try again.`);
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
  });
  const facebookAuthLogin = (facebookResponse) => {
    const { email, first_name, last_name, picture } = facebookResponse;
    let data = {
      email,
      first_name,
      last_name,
      role: userChoice?.role?.role || "normal",
      picture: picture?.data?.url,
    };
    facebook_Login(data).then((res) => {
      if (res?.res?.data && res?.res.status === 200) {
        dispatch(updateIsLoggedIn(true));
        dispatch(
          updateUserDetails(res?.res?.data?.newUser || res?.res?.data.user)
        );
        localStorage.setItem("jwtToken", res?.res?.data?.token);
        navigate("/");
        toast("Welcome to Treato! Start exploring now!");
      } else {
        toast.error(`An unexpected error occurred. Please try again.`);
      }
    });
  };
  const handleGoogleAuthLogin = () => {
    googleAuthLogin();
  };
  return (
    <div className={styles.user_social}>
      <div className={styles.usr_social_head}>Social</div>
      <div className={styles.usr_social_desc}>
        Link your social media profiles for seamless integration with your
        Treato account.
      </div>
      <div className={styles.usr_social_opt}>
        <div className={styles.social_options}>
          <div className={styles.social_opt_left}>
            <img loading="lazy" src={google} alt="" />
            Google
          </div>
          <div className={styles.social_opt_right}>
            <div
              className={
                user?.user?.google === "disconnect"
                  ? styles.social_opt_connect
                  : styles.social_opt_disconnect
              }
              onClick={handleGoogleAuthLogin}
            >
              {user?.user?.google === "disconnect" ? "Connect" : "Disconnect"}
            </div>
          </div>
        </div>
        <div className={styles.social_options}>
          <div className={styles.social_opt_left}>
            <img
              loading="lazy"
              src={facebook}
              alt=""
              className={styles.social_opt_logo}
            />
            Facebook
          </div>
          <div className={styles.social_opt_right}>
            <LoginSocialFacebook
              appId={facebookAppId}
              onResolve={(response) => {
                facebookAuthLogin(response?.data);
              }}
              onReject={(error) => {
                console.log(error);
              }}
            >
              <div
                className={
                  user?.user?.facebook === "disconnect"
                    ? styles.social_opt_connect
                    : styles.social_opt_disconnect
                }
              >
                {user?.user?.facebook === "disconnect"
                  ? "Connect"
                  : "Disconnect"}
              </div>
            </LoginSocialFacebook>
          </div>
        </div>
        <div className={styles.social_options}>
          <div className={styles.social_opt_left}>
            <img
              loading="lazy"
              src={instagram}
              alt=""
              className={styles.social_opt_logo}
            />
            Instagram
          </div>
          <div className={styles.social_opt_right}>
            <div
              className={
                user?.user?.instagram === "disconnect"
                  ? styles.social_opt_connect
                  : styles.social_opt_disconnect
              }
            >
              {user?.user?.instagram === "disconnect"
                ? "Connect"
                : "Disconnect"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const MemoizedSocialSettings = memo(SocialSettings);
