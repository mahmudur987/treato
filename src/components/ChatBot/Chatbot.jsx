import React, { useState, useRef, useEffect } from "react";
import style from "./chatbot.module.css";
import chatBotLogo from "../../assets/icons/Chatbot/chatbot.webp";
import userImage from "../../assets/images/AccountSettings/userImg.png";
import { GetAnswers } from "../../services/chatBot";
import { IoMdArrowBack } from "react-icons/io";

function Chatbot() {
  const [openGreeting, setOpen] = useState(false);
  const [openMessage, setMessage] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const quetions = [
    "Booking Cancellation",
    "Refund",
    "Contact Us",
    "Reschedule Service",
    "Pricing",
  ];
  const [userQuetion, setQuetions] = useState([
    {
      que: null,
      ans: null,
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const messageRef = useRef(null);

  const inputData = async (queData) => {
    const { res, err } = await GetAnswers(queData);
    if (res) {
      setQuetions([
        ...userQuetion,
        {
          que: queData,
          ans: res.response.answer,
        },
      ]);
      console.log(res);
    } else {
      setQuetions([
        ...userQuetion,
        {
          que: queData,
          ans: "Something went wrong!",
        },
      ]);
      console.log(err);
    }
    setUserInput("");
  };

  const closeGreeting = () => {
    setOpen(!openGreeting);
  };
  const openMessageFn = () => {
    setMessage(!openMessage);
  };
  const handleClick = (index) => {
    setSelectedQuestion(index);
    inputData(quetions[index]);
  };

  useEffect(() => {
    // Scroll to the bottom of the message container whenever messages change
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
    const openMessageFn = () => {
      setMessage(!openMessage);
    };
    const handleClick = (index) => {
      setSelectedQuestion(index);
      inputData(quetions[index]);
    };
  }, []);
  useEffect(() => {
    // Scroll to the bottom of the message container whenever messages change
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [userQuetion]);

  return (
    <>
      {openGreeting ? (
        ""
      ) : (
        <div className={style.aiContainer}>
          <section className={style.subBox}>
            <img src={chatBotLogo} alt="Chatbot Logo" />
            <div className={style.greetingBox}>
              <div>
                <p>👋</p>
                <p onClick={closeGreeting} className={style.closeButton}>
                  x
                </p>
              </div>
              <p className={style.chatBotMsg}>
                Got questions? I’m an AI chatbot here to help you find your way.
              </p>
            </div>
          </section>
        </div>
      )}

      <div
        onClick={() => {
          openMessageFn();
          setOpen(true);
        }}
        className={style.messageLogo}
      >
        {openMessage ? (
          <>
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </>
        ) : (
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="evenodd"
              d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
              clip-rule="evenodd"
            />
          </svg>
        )}
      </div>

      {openMessage ? (
        <>
          <div className={style.messageContainer}>
            <IoMdArrowBack
              onClick={() => {
                openMessageFn();
                setOpen(true);
              }}
              className={style.backArrow}
            />
            <nav className={style.chatNav}>
              <img src={chatBotLogo} alt="Chatbot Logo" />
              <p>Treatobot</p>
            </nav>
            <div ref={messageRef} className={style.subMsgBox}>
              <section className={style.introBox}>
                <img src={chatBotLogo} alt="Chatbot Logo" />
                <div className={style.msgBox}>
                  <div>
                    <p>
                      Got questions? I’m an AI chatbot here to help you find
                      your way.
                    </p>
                  </div>
                  <div>
                    <p>
                      Got questions? I’m an AI chatbot here to help you find
                      your way.
                    </p>
                  </div>
                </div>
              </section>
              <div className={style.quetionsBox}>
                {quetions &&
                  quetions.map((ele, index) => {
                    return (
                      <>
                        <div
                          key={index}
                          className={`${style.quetions} ${
                            index === selectedQuestion ? style.selected : ""
                          }`}
                          onClick={() => handleClick(index)}
                        >
                          {ele}
                        </div>
                      </>
                    );
                  })}
              </div>
              {userQuetion &&
                userQuetion.map((item) => {
                  return (
                    <>
                      {item.que && (
                        <div className={style.userSide}>
                          <div className={style.queansBox}>
                            <p className={style.queans}>{item?.que}</p>
                          </div>
                          <img
                            className={style.queImage}
                            src={userImage}
                            alt=""
                          />
                        </div>
                      )}

                      {item.ans && (
                        <div className={style.botSide}>
                          <img
                            className={style.ansImage}
                            src={chatBotLogo}
                            alt=""
                          />
                          <div className={style.ansBox}>
                            <p className={style.queans}>{item.ans}</p>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
            </div>
            <div className={style.inputContainer}>
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                type="text"
                placeholder="Write a message"
              />
              <svg
                onClick={() => inputData(userInput)}
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9.16109 12.9424L2.91109 12.4324C2.42109 12.3124 2.35109 11.6724 2.80109 11.4624L20.7111 3.55243C21.1811 3.34243 21.6711 3.81243 21.4411 4.25243L13.0111 21.2124C12.7811 21.6424 12.1211 21.5724 12.0011 21.1124L11.1711 13.2124L18.4411 6.41243"
                    stroke="#0F0F0F"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Chatbot;
