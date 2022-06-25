import React, { useState, useContext } from 'react';

import Styles from './../Home.module.css';

import { Formik } from 'formik';
import InputMask from 'react-input-mask';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Context from '../context'

const RadioButtons = (props) => {
    return (
        <>
            <Row className={`${Styles.textFontBlue} mx-2`}>
                <Col>Informe os dados do pagamento</Col>
            </Row>
            <Row className={`${Styles.textFontGlay} mx-2`}>
                <Col>
                    <InputGroup className="d-flex justify-content-center align-content-center" onChange={(e) => { props.setCurrentOptionOfPayment((e.target as HTMLInputElement).id) }}>
                        <Form.Check
                            inline
                            label="Cartão"
                            name="group1"
                            type="radio"
                            id="0"
                            defaultChecked={true}
                        />
                        <Form.Check
                            inline
                            label="Boleto"
                            name="group1"
                            type="radio"
                            id="1"
                        />
                        <Form.Check
                            inline
                            label="PIX"
                            name="group1"
                            type="radio"
                            id="2"
                        />
                    </InputGroup >
                </Col>
            </Row>
        </>
    );
}

const PageInfoPayment = (props) => {
    const [currentOptionOfPayment, setCurrentOptionOfPayment] = useState("0");



    const [showFeedbacks, setShowFeedbacks] = useState({
        cardName: false,
        cardNumber: false,
        cardExpiration: false,
        cardCVC: false,
        cpfNumber: false,
    });

    const { refValue, currentValueOfPayment, informations, setInformations } = useContext(Context);

    console.log(informations);

    if (currentOptionOfPayment === '0') {
        return (
            <Formik
                initialValues={{
                    cardName: '',
                    cardNumber: '',
                    cardExpiration: '',
                    cardCVC: '',
                }}
                validate={async (values) => {
                    let errors = {};

                    if (!values.cardName) {
                        errors['cardName'] = 'Coloque o nome do titular';
                        setShowFeedbacks((state) => {
                            return { ...state, cardName: true };
                        });
                    } else {
                        setShowFeedbacks((state) => {
                            return { ...state, cardName: false };
                        });
                    }

                    if (!values.cardNumber) {
                        errors['cardNumber'] = 'Coloque o número do cartão';
                        setShowFeedbacks((state) => {
                            return { ...state, cardNumber: true };
                        });
                    }

                    else if (values.cardNumber.length < 19) {
                        errors['cardNumber'] = 'Número do cartão inválido';
                        setShowFeedbacks((state) => {
                            return { ...state, cardNumber: true };
                        });
                    }

                    else {
                        setShowFeedbacks((state) => {
                            return { ...state, cardNumber: false };
                        });
                    }

                    if (!values.cardExpiration) {
                        errors['cardExpiration'] = 'Coloque a validade do cartão';
                        setShowFeedbacks((state) => {
                            return { ...state, cardExpiration: true };
                        });
                    }

                    else if (values.cardExpiration.length < 5) {
                        errors['cardExpiration'] = 'Validade inválida';
                        setShowFeedbacks((state) => {
                            return { ...state, cardExpiration: true };
                        });
                    }

                    else {
                        setShowFeedbacks((state) => {
                            return { ...state, cardExpiration: false };
                        });
                    }

                    if (!values.cardCVC) {
                        errors['cardCVC'] = 'Coloque o CVC';
                        setShowFeedbacks((state) => {
                            return { ...state, cardCVC: true };
                        });
                    }

                    else if (values.cardCVC.length < 3) {
                        errors['cardCVC'] = 'CVC inválido';
                        setShowFeedbacks((state) => {
                            return { ...state, cardCVC: true };
                        });
                    }

                    else {
                        setShowFeedbacks((state) => {
                            return { ...state, cardCVC: false };
                        });
                    }

                    return errors;
                }}

                onSubmit={(values, errors) => {
                    setInformations({
                        ...informations, payment: {
                            type: 'Cartão',
                            info: {
                                cardName: values.cardName,
                                cardNumber: values.cardNumber,
                                cardExpiration: values.cardExpiration,
                                cardCVC: values.cardCVC,
                            },
                            valueOfPaymentBRL: informations.payment.valueOfPaymentBRL,
                        }
                    });
                    props.clickNextStage();
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                }) => (
                    <Form onSubmit={handleSubmit} noValidate validated={false} ref={refValue[2]} style={{ display: 'none' }}>
                        <Row className="d-flex justify-content-center align-content-center" style={{ height: '100vh' }}>
                            <Col sm={9} md={6} xl={6} className="shadow" style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                                <RadioButtons setCurrentOptionOfPayment={setCurrentOptionOfPayment}> </RadioButtons>
                                <Row className={`${Styles.textFontGlay} mx-2`}>
                                    <Col >
                                        <Form.Label htmlFor="basic-url">Nome do titular</Form.Label>
                                        <InputGroup>
                                            <FormControl
                                                isInvalid={showFeedbacks.cardName}
                                                className="inputStyleDefault"
                                                placeholder="Coloque o nome do titular do cartão"
                                                aria-label="Coloque o nome do titular do cartão"
                                                aria-describedby="Coloque o nome do titular do cartão"
                                                id="cardName"
                                                name="cardName"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.cardName}
                                            />
                                            <Form.Control.Feedback type="invalid" id="feedback_userNameCard">
                                                {errors.cardName}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Row className={`${Styles.textFontGlay} mx-2`}>
                                    <Col md={8}>
                                        <Form.Label htmlFor="basic-url">Numero do Cartão</Form.Label>
                                        <InputMask mask="9999 9999 9999 9999" maskChar="" value={values.cardNumber} onChange={handleChange}>
                                            {() => <InputGroup>
                                                <FormControl
                                                    isInvalid={showFeedbacks.cardNumber}
                                                    className="inputStyleDefault"
                                                    placeholder="Coloque o número do cartão"
                                                    aria-label="Coloque o número do cartão"
                                                    aria-describedby="Coloque o número do cartão"
                                                    id="cardNumber"
                                                    name="cardNumber"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Control.Feedback type="invalid" id="feedback_cardNumber">
                                                    {errors.cardNumber}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                            }
                                        </InputMask>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label htmlFor="basic-url">Validade</Form.Label>
                                        <InputMask mask="99/99" maskChar="" value={values.cardExpiration} onChange={handleChange}>
                                            {() => <InputGroup>
                                                <FormControl
                                                    isInvalid={showFeedbacks.cardExpiration}
                                                    className="inputStyleDefault"
                                                    placeholder="Coloque a validade"
                                                    aria-label="Coloque a validade"
                                                    aria-describedby="Coloque a validade"
                                                    id="cardExpiration"
                                                    name="cardExpiration"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Control.Feedback type="invalid" id="feedback_cardExpiration">
                                                    {errors.cardExpiration}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                            }
                                        </InputMask>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Label htmlFor="basic-url">CVC</Form.Label>
                                        <InputMask mask="999" maskChar="" value={values.cardCVC} onChange={handleChange}>
                                            {() => <InputGroup>
                                                <FormControl
                                                    isInvalid={showFeedbacks.cardCVC}
                                                    className="inputStyleDefault"
                                                    placeholder="Coloque a validade"
                                                    aria-label="Coloque a validade"
                                                    aria-describedby="Coloque a validade"
                                                    id="cardCVC"
                                                    name="cardCVC"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Control.Feedback type="invalid" id="feedback_cardCVC">
                                                    {errors.cardCVC}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                            }
                                        </InputMask>
                                    </Col>
                                </Row>

                                <Row className="mx-5 my-4" >
                                    <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                        <Button onClick={props.clickPreviousStage} className="buttonWhite">Voltar</Button>
                                    </Col>
                                    <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                        <Button type='submit' className="buttonOrange">Pagar</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik >
        );
    } else {
        return (
            <Formik
                initialValues={{
                    cpfNumber: '',
                }}
                validate={async (values) => {
                    let errors = {};

                    if (!values.cpfNumber) {
                        errors['cpfNumber'] = 'Coloque seu CPF';
                        setShowFeedbacks((state) => {
                            return { ...state, cpfNumber: true };
                        });
                    } else if (values.cpfNumber.length < 14) {
                        errors['cpfNumber'] = 'CPF inválido';
                        setShowFeedbacks((state) => {
                            return { ...state, cpfNumber: true };
                        });
                    }
                    else {
                        setShowFeedbacks((state) => {
                            return { ...state, cpfNumber: false };
                        });
                    }
                    return errors;
                }}

                onSubmit={(values, errors) => {
                    setInformations({
                        ...informations, payment: {
                            type: currentOptionOfPayment == "1" ? 'Boleto' : 'PIX',
                            info: {
                                cpf: values.cpfNumber
                            },
                            valueOfPaymentBRL: informations.payment.valueOfPaymentBRL,
                        }
                    });
                    props.clickNextStage();
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                }) => (
                    <Form onSubmit={handleSubmit} noValidate validated={false} ref={refValue[2]} style={{ display: 'none' }}>
                        <Row className="d-flex justify-content-center align-content-center" style={{ height: '100vh' }}>
                            <Col sm={9} md={6} xl={6} className="shadow" style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                                <RadioButtons setCurrentOptionOfPayment={setCurrentOptionOfPayment}> </RadioButtons>
                                <Row className={`${Styles.textFontGlay} mx-2`}>
                                    <Col>
                                        <Form.Label htmlFor="basic-url">CPF</Form.Label>
                                        <InputMask mask="999.999.999-99" maskChar="" value={values.cpfNumber} onChange={handleChange}>
                                            {() => <InputGroup>
                                                <FormControl
                                                    isInvalid={showFeedbacks.cpfNumber}
                                                    className="inputStyleDefault"
                                                    placeholder="Coloque seu CPF"
                                                    aria-label="Coloque seu CPF"
                                                    aria-describedby="Coloque seu CPF"
                                                    id="cpfNumber"
                                                    name="cpfNumber"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                />
                                                <Form.Control.Feedback type="invalid" id="feedback_cpfNumber">
                                                    {errors.cpfNumber}
                                                </Form.Control.Feedback>
                                            </InputGroup>
                                            }
                                        </InputMask>
                                    </Col>
                                </Row>
                                <Row className="mx-5 my-4" >
                                    <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                        <Button onClick={props.clickPreviousStage} className="buttonWhite">Voltar</Button>
                                    </Col>
                                    <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                        <Button type='submit' className="buttonOrange">Pagar</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik >
        );
    }



}

export default PageInfoPayment;
