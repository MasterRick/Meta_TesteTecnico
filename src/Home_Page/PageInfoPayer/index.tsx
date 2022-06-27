import React, { useState, useContext, FC } from 'react';

import { Formik } from 'formik';
import InputMask from 'react-input-mask';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import Context from '../../Context'

import { PropsType } from './model'
import { PageInfoPayerController } from './controller'


const PageInfoPayer: FC<PropsType> = (props) => {
    const [currentCurrency, setCurrentCurrency] = useState(1);

    const [showFeedbacks, setShowFeedbacks] = useState({
        name: false,
        email: false,
        cep: false,
        number: false,
        complement: false,
    });

    const { refValue, currentValueOfPayment, currentCoin, informations, setInformations } = useContext(Context);

    const PageInfoPayerControllerConst = new PageInfoPayerController(setShowFeedbacks, informations, setInformations, currentCurrency, currentValueOfPayment, props.clickNextStage);


    switch (currentCoin) {
        case "US$":
            PageInfoPayerControllerConst.GetCurrencyInformations("usd", setCurrentCurrency);
            break;
        case "€":
            PageInfoPayerControllerConst.GetCurrencyInformations("eur", setCurrentCurrency);
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
            validate={PageInfoPayerControllerConst.validadeForm}

            onSubmit={PageInfoPayerControllerConst.submitForm}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,

            }) => (
                <Form onSubmit={handleSubmit} noValidate validated={false} ref={refValue[1]} style={{ display: 'none' }}>
                    <Row className="d-flex justify-content-center align-content-center" style={{ height: '100vh' }}>
                        <Row className="d-flex justify-content-center align-content-end">
                            {
                                currentCoin === "US$" ?
                                    <>
                                        <Col sm={3} md={2} xl={2} className="mb-3" >
                                            <img src='./brl.svg' alt="bandeira do brasil" width="30vw" />
                      &nbsp;R$ {currentValueOfPayment != null && (currentCurrency * currentValueOfPayment).toFixed(1)} &nbsp;
                    </Col>
                                        <Col sm={3} md={2} xl={2} className="mb-3" >
                                            <img src='./eua.svg' alt="bandeira dos estados unidos" width="30vw" />
                    &nbsp;US$ {currentValueOfPayment != null && currentValueOfPayment.toFixed(1)} &nbsp;
                </Col>
                                    </>
                                    : currentCoin === "€" ?
                                        <>
                                            <Col sm={2} md={2} xl={2} className="mb-3" >
                                                <img src='./brl.svg' alt="bandeira do brasil" width="30vw" />
                      &nbsp;R$ {currentValueOfPayment != null && (currentCurrency * currentValueOfPayment).toFixed(1)} &nbsp;
                    </Col>
                                            <Col sm={2} md={2} xl={2} className="mb-3" >
                                                <img src='./eu.svg' alt="bandeira da união europeia" width="30vw" />
                       &nbsp;€ {currentValueOfPayment != null && currentValueOfPayment.toFixed(1)} &nbsp;
                      </Col>
                                        </>
                                        :
                                        <Col sm={2} md={2} xl={2} className="mb-3" >
                                            <img src='./brl.svg' alt="bandeira do brasil" width="30vw" />
                      &nbsp;R$ {currentValueOfPayment != null && currentValueOfPayment.toFixed(1)} &nbsp;
                    </Col>
                            }
                        </Row>
                        <Col sm={9} md={6} xl={6} className="shadow" style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                            <Row className={`textFontBlue mx-2`}>
                                <Col>Informe seus dados</Col>
                            </Row>
                            <Row className={`textFontGlay mx-2`}>
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
                            <Row className={`textFontGlay mx-2`}>
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
                            <Row className={`textFontGlay mx-2`}>
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
                            <Row className={`textFontGlay mx-2`}>
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
