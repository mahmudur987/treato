import React from 'react'
import RightIcon from "../../../../assets/images/AccountSettings/chevron-right.svg"
import sty from "./SalonPictures.module.css"
import { useNavigate } from 'react-router-dom'




export const SalonPictures = () => {
    const data = [
        {
            title: "Store timings",
            content: "Manage opening and closing hours.",
            icon: RightIcon
        },
        {
            title: "Location",
            content: "Add and edit salon location details.",
            icon: RightIcon
        },
        {
            title: "Salon Pictures",
            content: "Add and edit pictures for your salon page.",
            icon: RightIcon
        },
    ]

    const navigate = useNavigate()


    const allComponentOpenSmallScreen = (title) => {
        switch (title) {
            case "Store timings":
                navigate("/service/storetime")
                break
            case "Location":
                navigate("/service/location")
                break
            case "Salon Pictures":
                navigate("/service/PicturesGallery")
                break
            default:
                // Handle default case
                break
        }
    }

    return (
        <div>
            <div className={sty.byDefaultScreen}>
                <SalonPicturesDefaultScreen />
            </div>
            <div className={sty.openOnSmallScreen}>
                {data.map((item, i) => (<>
                    <div className={sty.mainDiv} key={i}>
                        <div>
                            <h1>{item.title}</h1>
                            <div className={sty.mainDiv1}>{item.content}</div>
                        </div>
                        <p className={sty.mainDiv2} onClick={() => allComponentOpenSmallScreen(item.title)}>
                            <img src={item.icon} alt="RightIcon" className={sty.mainDiv3} />
                        </p>
                    </div>
                    <div className={sty.horizontalLine}></div>
                </>

                ))}
            </div>

        </div>
    )
}




const SalonPicturesDefaultScreen = () => {
    const navigate = useNavigate()
    const PicturesGalleryFun = () => {
        navigate("/service/PicturesGallery")
    }
    return (<>

        <div className={sty.mainDiv} >
            <div>
                <h1>Salon Pictures</h1>
                <div className={sty.mainDiv1}>Add and edit pictures for your salon page.</div>
            </div>
            <p className={sty.mainDiv2} onClick={() => PicturesGalleryFun()}>
                <img src={RightIcon} alt="RightIcon" className={sty.mainDiv3} />
            </p>
        </div>
        <div className={sty.horizontalLine}></div>
    </>

    )
}

export default SalonPicturesDefaultScreen
