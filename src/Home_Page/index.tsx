import React, { useState, useRef } from 'react';

import Container from 'react-bootstrap/Container';

import PageInfoValueOfPayment from './PageInfoValueOfPayment/index'
import PageInfoPayer from './PageInfoPayer/index'
import PageInfoPayment from './PageInfoPayment/index'
import PageSucessPayment from './PageSucessPayment/index'

import Context from '../Context'

import { HomeController } from './controller'

const Home = () => {

  const [, setStage] = useState(0);

  const [currentValueOfPayment, setCurrentValueOfPayment] = useState(0);
  const [currentCoin, setCurrentCoin] = useState("R$");

  const [informations, setInformations] = useState({
    name: '',
    email: '',
    cep: '',
    city: '',
    state: '',
    address: '',
    number: '',
    complement: '',
    payment: {
      type: '',
      info: {
        valueOfPaymentBRL: 0
      }
    }
  });

  const stageDOM = [useRef<HTMLFormElement>(null), useRef<HTMLFormElement>(null), useRef<HTMLFormElement>(null), useRef<HTMLFormElement>(null)];

  const HomeControllerConst = new HomeController(setStage, stageDOM);

  return (
    <Context.Provider value={{
      refValue: stageDOM,
      informations: informations,
      setInformations: setInformations,
      currentValueOfPayment: currentValueOfPayment,
      setCurrentValueOfPayment: setCurrentValueOfPayment,
      currentCoin: currentCoin,
      setCurrentCoin: setCurrentCoin
    }}>
      <Container>
        <PageInfoValueOfPayment clickNextStage={HomeControllerConst.clickNextStage} ></PageInfoValueOfPayment>
        <PageInfoPayer clickNextStage={HomeControllerConst.clickNextStage} clickPreviousStage={HomeControllerConst.clickPreviousStage} ></PageInfoPayer>
        <PageInfoPayment clickNextStage={HomeControllerConst.clickNextStage} clickPreviousStage={HomeControllerConst.clickPreviousStage} ></PageInfoPayment>
        <PageSucessPayment></PageSucessPayment>
      </Container>
    </Context.Provider>
  );
}

export default Home;
