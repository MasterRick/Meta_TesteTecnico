import React, { useState, useContext } from 'react';

import Styles from './../Home.module.css';

import { Formik } from 'formik';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Context from "../context";


const PageSucessPayment = () => {

    const { refValue, informations } = useContext(Context);

    return (
        <Form ref={refValue[3]}>
            <Row className="d-flex justify-content-center align-content-center" style={{ height: '100vh' }}>
                <Col sm md xl={9} className="shadow" style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                    <Row className={`${Styles.textFontBlue} mx-2`}>
                        <Col>Informações do pagador</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>Nome: </b>{informations.name}</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>Email: </b>{informations.email}</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>CEP: </b>{informations.cep}</Col>
                        <Col><b>Numero: </b>{informations.number}</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col md={8}><b>Cidade: </b>{informations.city}</Col>
                        <Col><b>Estado: </b>{informations.state}</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>Endereço: </b>{informations.address}</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>Complemento: </b>{informations.complement}</Col>
                    </Row>
                    <Row className={`${Styles.textFontBlue} mx-2`}>
                        <Col>Informações do pagamento</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>TIPO: </b>{informations.payment.type}</Col>
                    </Row>
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>Valor:R$ </b>{informations.payment.valueOfPaymentBRL.toFixed(1)}</Col>
                    </Row>
                    {
                        informations.payment.type === "Cartão" ?
                            <>
                                <Row className={`${Styles.textFontGlay} mx-2`}>
                                    <Col><b>Nome do Titular do Cartão: </b>{informations.payment.info.cardName}</Col>
                                </Row>
                                <Row className={`${Styles.textFontGlay} mx-2`}>
                                    <Col md={6}><b>Número: </b>{informations.payment.info.cardNumber}</Col>
                                    <Col md={4}><b>Validade: </b>{informations.payment.info.cardExpiration}</Col>
                                </Row>
                                <Row className={`${Styles.textFontGlay} mx-2`}>
                                    <Col><b>CVC: </b>{informations.payment.info.cardCVC}</Col>
                                </Row>
                            </>
                            :
                            <Row className={`${Styles.textFontGlay} mx-2`}>
                                <Col><b>CPF: </b>{informations.payment.info.cpf}</Col>
                            </Row>
                    }
                    <Row className={`${Styles.textFontGlay} mx-2`}>
                        <Col><b>JSON:</b>{JSON.stringify(informations)}</Col>
                    </Row>
                </Col>
            </Row>
        </Form>
    );
}

export default PageSucessPayment;
