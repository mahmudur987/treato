import React, { useState } from 'react';
import style from './options.module.css'

function QuestionOptions() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleAccordion = (index) => {
        if (expandedIndex === index) {
            setExpandedIndex(null);
        } else {
            setExpandedIndex(index);
        }
    };

    const faqData = [
        {
            question: 'Can I still set up payment processing if my bank account is set up in my business name?',
            answer: 'Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul. We believe in the power of simplicity, and our spa reflects this philosophy. Every detail, from the soothing decor to the user-friendly online experience, is designed to enhance your wellness journey. Immerse yourself in the calming ambience as we curate an oasis for your mind, body, and soul',
        },
        {
            question: 'Can I still set up payment processing if my bank account is set up in my business name?',
            answer: 'Answer 2.',
        },
        // Add more FAQ items as needed
    ];

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    return (
        <>
            <div className={style.header} >
                <h3>Frequently Asked Questions</h3>
            </div>
            <div className={style.container} >
                <h6
                    className={selectedOption === 'Option 1' ? `${style.selected}` : ''}
                    onClick={(() => {
                        scrollToSection('cancellation');
                        handleOptionClick('Option 1');
                    })

                    }>Cancellation</h6>
                <h6
                    className={selectedOption === 'Option 2' ? `${style.selected}` : ''}
                    width={214}
                    onClick={(() => {
                        scrollToSection('refund');
                        handleOptionClick('Option 2')
                    })}  >Refund</h6>
                <h6 width={59}
                    className={selectedOption === 'Option 3' ? `${style.selected}` : ''}
                    onClick={(() => {
                        scrollToSection('Booking');
                        handleOptionClick('Option 3')
                    })}
                >Booking Appointments</h6>
                <h6
                    className={selectedOption === 'Option 4' ? `${style.selected}` : ''}
                    width={141}
                    onClick={(() => {
                        scrollToSection('Pricing');
                        handleOptionClick('Option 4')
                    })}
                >Pricing</h6>
                <h6
                    className={selectedOption === 'Option 5' ? `${style.selected}` : ''}
                    width={137}
                    onClick={(() => {
                        scrollToSection('Contact Us');
                        handleOptionClick('Option 5')
                    })}
                >Contact Us</h6>
            </div>
            <div className={style.rightbox} >
                <p><b>Cancellation</b></p>
                <div className={style.questionbox} >
                    {faqData.map((faq, index) => (
                        <div key={index} className={style.faqitem}>
                            <div
                                className={`${style.question} ${expandedIndex === index ? `${style.expanded}` : ''}`}
                                onClick={() => toggleAccordion(index)}
                            >
                                {faq.question}
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
