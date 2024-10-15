import React, { useState, useRef, useEffect } from "react";
import style from "./chatbot.module.css";
import chatBotLogo from "../../assets/icons/Chatbot/chatbot.webp";
import userImage from "../../assets/images/AccountSettings/userImg.png";
import { GetAnswers } from "../../services/chatBot";
import { IoMdArrowBack } from "react-icons/io";
import icon1 from "../../assets/svgs/icon (18).svg";
import icon2 from "../../assets/svgs/icon (19).svg";
import icon3 from "../../assets/svgs/icon (37).svg";
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
            <img src={icon1} alt="" />
          </>
        ) : (
          <img src={icon2} alt="" />
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
              <img src={icon3} alt="" onClick={() => inputData(userInput)} />
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Chatbot;
