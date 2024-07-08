import React, { useState, useEffect } from 'react';
import style from './options.module.css';

import { Link } from 'react-router-dom';
import { getFaqs } from '../../services/faqs';
import { toast } from 'react-toastify';

function QuestionOptions() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const [faqData, setFaqs] = useState(null);




    
    const toggleAccordion = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };
    

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const getselectedOption = async (data) => {
        const { res, err } = await getFaqs(data);
        if (res) {
            setFaqs(res.data)
        }
        else {
            toast.error("Something went wrong!")
        }

        return data;

    }

    useEffect(() => {
        getselectedOption('Cancellation');
        handleOptionClick('Option 1');
    }, [])


    return (
        <>
            <div className={style.header} >
                <h3>Frequently Asked Questions</h3>
            </div>
            <div className={style.container} >
                <h6
                    className={selectedOption === 'Option 1' ? `${style.selected}` : ''}
                    onClick={(() => {
                        getselectedOption('Cancellation');
                        handleOptionClick('Option 1');
                    })

                    }>Cancellation</h6>
                <h6
                    className={selectedOption === 'Option 2' ? `${style.selected}` : ''}
                    width={214}
                    onClick={(() => {
                        getselectedOption('Refund');
                        handleOptionClick('Option 2')
                    })}  >Refund</h6>
                <h6 width={59}
                    className={selectedOption === 'Option 3' ? `${style.selected}` : ''}
                    onClick={(() => {
                        getselectedOption('Booking');
                        handleOptionClick('Option 3')
                    })}
                >Booking <span className={style.Appointments} >Appointments</span></h6>
                <h6
                    className={selectedOption === 'Option 4' ? `${style.selected}` : ''}
                    width={141}
                    onClick={(() => {
                        getselectedOption('Pricing');
                        handleOptionClick('Option 4')
                    })}
                >Pricing</h6>
                <h6
                    className={`${selectedOption === 'Option 5' ? style.selected : ''} ${style.contactUs}`}
                    width={137}
                    onClick={(() => {
                        getselectedOption('Contact Us');
                        handleOptionClick('Option 5')
                    })}
                >Contact Us</h6>
            </div>
            <hr className={style.verticalLine} />
            <div className={style.rightbox} >
                <p><b>{faqData?.topic}</b></p>
                <div className={style.questionbox} >
                    {faqData !== null &&
                        faqData.faqq.map((faq, index) => (
                            <div key={index} className={style.faqitem}>
                                <div
                                    className={`${style.question} ${expandedIndex === index ? `${style.expanded}` : ''}`}
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <p>{faq.question}</p>
                                    {expandedIndex === index ? (
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7"/>
                                      </svg>
                                      
                                    ) : (
                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                        </svg>

                                    )}


                                </div>
                                <div className={`${style.answer} ${expandedIndex === index ? `${style.show}` : ''}`}>
                                    {faq.answer}
                                </div>
                                <hr className={style.horizon} />
                            </div>
                        ))}

                </div>
                <div className={`${style.contactbox} ${style.contactUs}`} ><p className={style.contactus} >Can’t find the answer you’re looking for?</p>
                    <Link to="/contactus"><p className={style.linker} >Contact Us</p></Link>
                </div>
            </div>


        </>
    )
}

export default QuestionOptions
