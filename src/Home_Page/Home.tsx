import React, { useState, useRef } from 'react';

import Container from 'react-bootstrap/Container';

import PageInfoValueOfPayment from './PageInfoValueOfPayment/index'
import PageInfoPayer from './PageInfoPayer/index'
import PageInfoPayment from './PageInfoPayment/index'
import PageSucessPayment from './PageSucessPayment/index'


import Context from './context'

const Home = () => {

  const [stage, setStage] = useState(0);

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

      },
      valueOfPaymentBRL: 0,
    }
  });

  const stageDOM = [useRef<HTMLFormElement>(null), useRef<HTMLFormElement>(null), useRef<HTMLFormElement>(null), useRef<HTMLFormElement>(null)];

  const clickNextStage = () => {
    setStage(stage + 1);

    for (let i = 0; i < stageDOM.length; i++) {
      let aux = stageDOM[i].current;
      if (aux !== null)
        aux.style.display = "none";
    }

    setStage((state) => {
      let aux = stageDOM[state].current;
      if (aux !== null)
        aux.style.display = "block";

      return state;
    });
  }

  const clickPreviousStage = () => {
    setStage(stage - 1);

    for (let i = 0; i < stageDOM.length; i++) {
      let aux = stageDOM[i].current;
      if (aux !== null)
        aux.style.display = "none";
    }

    setStage((state) => {

      let aux = stageDOM[state].current;
      if (aux !== null)
        aux.style.display = "block";

      return state;
    });

  }

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
        <PageInfoValueOfPayment clickNextStage={clickNextStage} ></PageInfoValueOfPayment>
        <PageInfoPayer clickNextStage={clickNextStage} clickPreviousStage={clickPreviousStage} ></PageInfoPayer>
        <PageInfoPayment clickNextStage={clickNextStage} clickPreviousStage={clickPreviousStage} ></PageInfoPayment>
        <PageSucessPayment></PageSucessPayment>
      </Container>
    </Context.Provider>
  );
}

export default Home;
