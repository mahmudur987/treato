import React from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import QuestionOptions from '../../pages/FrequentlyAskedQuestions/QuestionOptions';

function FrequentlyAskedQuestionsPage() {
  return (
    <>
    <Navbar/>
      <QuestionOptions/>
    </>
  )
}

export default FrequentlyAskedQuestionsPage
