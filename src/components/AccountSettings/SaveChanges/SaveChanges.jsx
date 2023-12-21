// import { useDispatch } from "react-redux";
import styles from "./SaveChanges.module.css";
import { updateUserDetails } from "../../../redux/slices/user";

export default function SaveChanges() {
    // const dispatch = useDispatch()
    return (
        <div className={styles.save_main}>
            <button>
                {/* <button onClick={e => { dispatch(updateUserDetails()) }} > */}
                Save Changes
            </button>
        </div>
    )
}