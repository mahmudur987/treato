import React from 'react';
import {Outlet} from 'react-router-dom';
import AboutusNavBar from '../../components/Aboutus/AboutUsNavBar/AboutusNavBar';
import QuestionOptions from '../../components/FrequentlyAskedQuestions/Options/QuestionOptions';

function FrequentlyAskedQuestionsPage() {
  return (
    <>
    <AboutusNavBar/>
      <QuestionOptions/>
    </>
  )
}

export default FrequentlyAskedQuestionsPage
