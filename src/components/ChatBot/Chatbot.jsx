import React, { useState } from 'react';
import style from './chatbot.module.css';
import chatBotLogo from "../../assets/icons/Chatbot/chatbot.png"

function Chatbot() {

    const [openGreeting, setOpen] = useState(false);
    const [openMessage, setMessage] = useState(false);


    const closeGreeting = () => {
        setOpen(!openGreeting);
    }
    const openMessageFn= () => {
        setMessage(!openMessage);
    }


    return (
        <>

            {openGreeting ? "" : <div className={style.aiContainer} >
                <section className={style.subBox} >
                    <img src={chatBotLogo} alt="Chatbot Logo" />
                    <div className={style.greetingBox} >
                        <div>
                            <p>👋</p>
                            <p onClick={closeGreeting} className={style.closeButton} >x</p>
                        </div>
                        <p className={style.chatBotMsg} >Got questions? I’m an AI chatbot here to help you find your way.</p>
                    </div>

                </section>
            </div>}



            <div onClick={openMessageFn} className={style.messageLogo} >
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z" clip-rule="evenodd" />
                </svg>

            </div>
            
            // {openMessage ? "":<>
            // <div className={style.messageContainer} >

            // </div>
            // </>}
            
        </>
    )
}

export default Chatbot;
