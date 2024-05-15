import React, { useState, useEffect } from 'react';
import style from './options.module.css'
import { getFaqs } from '../../services/faqs';

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
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const getselectedOption = async (data) => {
        const { res, err } = await getFaqs(data);
        if (res) {
            console.log(res.data.faqq);
            setFaqs(res.data)
        }
        else {
            console.log(err);
        }

        return data;

    }

    useEffect(() => {
        getselectedOption('cancellation');
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
                        getselectedOption('cancellation');
                        handleOptionClick('Option 1');
                    })

                    }>Cancellation</h6>
                <h6
                    className={selectedOption === 'Option 2' ? `${style.selected}` : ''}
                    width={214}
                    onClick={(() => {
                        getselectedOption('refund');
                        handleOptionClick('Option 2')
                    })}  >Refund</h6>
                <h6 width={59}
                    className={selectedOption === 'Option 3' ? `${style.selected}` : ''}
                    onClick={(() => {
                        getselectedOption('booking');
                        handleOptionClick('Option 3')
                    })}
                >Booking Appointments</h6>
                <h6
                    className={selectedOption === 'Option 4' ? `${style.selected}` : ''}
                    width={141}
                    onClick={(() => {
                        getselectedOption('pricing');
                        handleOptionClick('Option 4')
                    })}
                >Pricing</h6>
                <h6
                    className={selectedOption === 'Option 5' ? `${style.selected}` : ''}
                    width={137}
                    onClick={(() => {
                        getselectedOption('contactus');
                        handleOptionClick('Option 5')
                    })}
                >Contact Us</h6>
            </div>
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
                            </div>
                        ))}

                </div>
                <div className={style.contactbox} ><p className={style.contactus} >Can’t find the answer you’re looking for?</p>
                    <p className={style.linker} >Contact Us</p>
                </div>
            </div>


        </>
    )
}

export default QuestionOptions
