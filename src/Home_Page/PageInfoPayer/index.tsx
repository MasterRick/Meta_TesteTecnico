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

import CurrencyAPI from '../../Currency_Api/api';
import AddressAPI from '../../Address_Api/api';

import Context from '../context'

const PageInfoPayer = (props) => {
    const [currentCurrency, setCurrentCurrency] = useState(1);

    const [showFeedbacks, setShowFeedbacks] = useState({
        name: false,
        email: false,
        cep: false,
        number: false,
        complement: false,
    });

    const { refValue, currentValueOfPayment, currentCoin, informations, setInformations } = useContext(Context);

    const getCurrencyInformations = async (params) => {
        //setIsLoading(true);
        await CurrencyAPI.get(`/latest/currencies/${params}.json`).then((response) => {
            return response;
        }).then(data => {
            setCurrentCurrency(data.data[params].brl);
            //setIsLoading(false);
        }).catch((error) => {
            console.log(error.response);
        });
    }

    const getAddressInformations = async (params) => {
        //setIsLoading(true);
        return await AddressAPI.get(`/${params}/json`).then((response) => {
            return response;
        }).then(data => {

            if (data.data.erro === "true") {
                setShowFeedbacks((state) => {
                    return { ...state, cep: true };
                });
                return true;
            } else {
                setInformations(
                    { ...informations, cep: data.data.cep, city: data.data.localidade, state: data.data.uf, address: data.data.logradouro }
                );

                setShowFeedbacks((state) => {
                    return { ...state, cep: false };
                });
                return false;
            }

            //setIsLoading(false);
        }).catch((error) => {
            setShowFeedbacks((state) => {
                console.log(state);
                return { ...state, cep: true };
            });
            setInformations({ ...informations, cep: '', city: '', state: '', address: '', complement: '' });
            return true;
        });
    }

    switch (currentCoin) {
        case "US$":
            getCurrencyInformations("usd");
            break;
        case "€":
            getCurrencyInformations("eur");
            break;
        default:
            break;
    }


    return (
        <Formik
            initialValues={{
                name: '',
                email: '',
                cep: '',
                number: '',
                complement: '',
            }}
            validate={async (values) => {
                let errors = {};

                if (!values.name) {
                    errors['name'] = 'Coloque seu nome';
                    setShowFeedbacks((state) => {
                        return { ...state, name: true };
                    });
                } else {
                    setShowFeedbacks((state) => {
                        return { ...state, name: false };
                    });
                }

                if (!values.email) {
                    errors['email'] = 'Coloque seu email';
                    setShowFeedbacks((state) => {
                        return { ...state, email: true };
                    });
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                ) {
                    errors['email'] = 'Insira um endereço de email válido';
                    setShowFeedbacks((state) => {
                        return { ...state, email: true };
                    });
                } else {
                    setShowFeedbacks((state) => {
                        return { ...state, email: false };
                    });
                }


                if (!values.cep) {
                    errors['cep'] = 'Coloque seu CEP';
                    setShowFeedbacks((state) => {
                        return { ...state, cep: true };
                    });
                    setInformations({ ...informations, city: '', state: '', address: '', complement: '', number: '' });
                } else if (values.cep.length < 9) {
                    errors['cep'] = 'CEP inválido';
                    setShowFeedbacks((state) => {
                        return { ...state, cep: true };
                    });
                    setInformations({ ...informations, city: '', state: '', address: '', complement: '', number: '' });
                }
                else {
                    const testRequest = await getAddressInformations(values.cep.replace("-", "").trim());

                    if (testRequest) {
                        errors['cep'] = 'CEP inválido';
                        setShowFeedbacks((state) => {
                            return { ...state, cep: true };
                        });
                    }
                }

                if (!values.number) {
                    errors['number'] = 'Sem número';
                    setShowFeedbacks((state) => {
                        return { ...state, number: true };
                    });
                } else {
                    setShowFeedbacks((state) => {
                        return { ...state, number: false };
                    });
                }
                return errors;
            }}

            onSubmit={(values, errors) => {
                setInformations({
                    ...informations, name: values.name, email: values.email, cep: values.cep, complement: values.complement, number: values.number, payment: {
                        type: '',
                        info: {},
                        valueOfPaymentBRL: currentCurrency * currentValueOfPayment,
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
                <Form onSubmit={handleSubmit} noValidate validated={false} ref={refValue[1]} style={{ display: 'none' }}>
                    <Row className="d-flex justify-content-center align-content-center" style={{ height: '100vh' }}>
                        <Row className="d-flex justify-content-center align-content-end">
                            {
                                currentCoin === "US$" ?
                                    <>
                                        <Col sm={3} md={2} xl={2} className="mb-3" >
                                            <img src='./brl.svg' width="30vw" />
                      &nbsp;R$ {currentValueOfPayment != null && (currentCurrency * currentValueOfPayment).toFixed(1)} &nbsp;
                    </Col>
                                        <Col sm={3} md={2} xl={2} className="mb-3" >
                                            <img src='./eua.svg' width="30vw" />
                    &nbsp;US$ {currentValueOfPayment != null && currentValueOfPayment.toFixed(1)} &nbsp;
                </Col>
                                    </>
                                    : currentCoin === "€" ?
                                        <>
                                            <Col sm={2} md={2} xl={2} className="mb-3" >
                                                <img src='./brl.svg' width="30vw" />
                      &nbsp;R$ {currentValueOfPayment != null && (currentCurrency * currentValueOfPayment).toFixed(1)} &nbsp;
                    </Col>
                                            <Col sm={2} md={2} xl={2} className="mb-3" >
                                                <img src='./eu.svg' width="30vw" />
                       &nbsp;€ {currentValueOfPayment != null && currentValueOfPayment.toFixed(1)} &nbsp;
                      </Col>
                                        </>
                                        :
                                        <Col sm={2} md={2} xl={2} className="mb-3" >
                                            <img src='./brl.svg' width="30vw" />
                      &nbsp;R$ {currentValueOfPayment != null && currentValueOfPayment.toFixed(1)} &nbsp;
                    </Col>
                            }
                        </Row>
                        <Col sm={9} md={6} xl={6} className="shadow" style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                            <Row className={`${Styles.textFontBlue} mx-2`}>
                                <Col>Informe seus dados</Col>
                            </Row>
                            <Row className={`${Styles.textFontGlay} mx-2`}>
                                <Col >
                                    <Form.Label htmlFor="basic-url">Nome</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            isInvalid={showFeedbacks.name}
                                            className="inputStyleDefault"
                                            placeholder="Seu nome"
                                            aria-label="Seu nome"
                                            aria-describedby="Seu nome"
                                            id="user_name"
                                            name="name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.name}
                                        />
                                        <Form.Control.Feedback type="invalid" id="feedback_name">
                                            {errors.name}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="basic-url">Email</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            isInvalid={showFeedbacks.email}
                                            className="inputStyleDefault"
                                            placeholder="Seu email"
                                            aria-label="Seu email"
                                            aria-describedby="Seu email"
                                            id="user_email"
                                            name="email"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                        />
                                        <Form.Control.Feedback type="invalid" id="feedback_email">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className={`${Styles.textFontGlay} mx-2`}>
                                <Col >
                                    <Form.Label htmlFor="basic-url">CEP</Form.Label>
                                    <InputMask mask="99999-999" maskChar="" value={values.cep} onChange={handleChange}>
                                        {() => <InputGroup>
                                            <FormControl
                                                isInvalid={showFeedbacks.cep}
                                                className="inputStyleDefault"
                                                placeholder="Seu cep"
                                                aria-label="Seu cep"
                                                aria-describedby="Seu cep"
                                                id="user_cep"
                                                name="cep"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                            />
                                            <Form.Control.Feedback type="invalid" id="feedback_cep">
                                                {errors.cep}
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                        }
                                    </InputMask>
                                </Col>
                                <Col>
                                    <Form.Label htmlFor="basic-url">Cidade</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            disabled={true}
                                            isInvalid={showFeedbacks.cep}
                                            className="inputStyleDefault"
                                            name="city"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={informations.city}
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md={2}>
                                    <Form.Label htmlFor="basic-url">UF</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            disabled={true}
                                            isInvalid={showFeedbacks.cep}
                                            className="inputStyleDefault"
                                            name="UF"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={informations.state}
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row className={`${Styles.textFontGlay} mx-2`}>
                                <Col>
                                    <Form.Label htmlFor="basic-url">Endereço</Form.Label>
                                    <InputGroup>
                                        <FormControl
                                            disabled={true}
                                            isInvalid={showFeedbacks.cep}
                                            className="inputStyleDefault"
                                            id="user_email"
                                            name="address"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={informations.address}
                                        />
                                    </InputGroup>
                                </Col>

                                <Col md={2}>
                                    <Form.Label htmlFor="basic-url">Numero</Form.Label>
                                    <InputGroup>

                                        <FormControl
                                            isInvalid={showFeedbacks.number}
                                            className="inputStyleDefault"
                                            id="user_number"
                                            name="number"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid" id="feedback_number">
                                            {errors.number}
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                </Col>
                            </Row>
                            <Row className={`${Styles.textFontGlay} mx-2`}>
                                <Col>
                                    <Form.Label htmlFor="basic-url">Complemento</Form.Label>
                                    <InputGroup>

                                        <FormControl
                                            isInvalid={showFeedbacks.complement}
                                            className="inputStyleDefault"
                                            id="user_number"
                                            name="complement"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <Form.Control.Feedback type="invalid" id="feedback_complement">
                                            {errors.complement}
                                        </Form.Control.Feedback>
                                    </InputGroup>

                                </Col>
                            </Row>
                            <Row className="mx-5 my-4" >
                                <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                    <Button onClick={props.clickPreviousStage} className="buttonWhite">Voltar</Button>
                                </Col>
                                <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                    <Button type='submit' className="buttonBlue">Próximo</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik >
    );
}

export default PageInfoPayer;
