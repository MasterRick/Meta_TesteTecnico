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

const PageInfoValueOfPayment = (props) => {
    const [showFeedbacks, setShowFeedbacks] = useState({
        valueOfPayment: false,
    });

    const { refValue, setCurrentValueOfPayment, currentCoin, setCurrentCoin } = useContext(Context);

    const changeCoin = (e) => {

        switch (e.target.value) {
            case "1":
                setCurrentCoin("R$");
                break;
            case "2":
                setCurrentCoin("US$");
                break;
            case "3":
                setCurrentCoin("€");
                break;
            default:
                break;
        }
    }

    return (
        <Formik
            initialValues={{ valueOfPayment: 0 }}
            validate={values => {
                let errors = {};

                if (values.valueOfPayment.toString().length > 0) {
                    setCurrentValueOfPayment(values.valueOfPayment);
                }

                if (values.valueOfPayment <= 0) {
                    errors['valueOfPayment'] = 'Valor para o pagamento deve ser maior que 0';
                    setShowFeedbacks({ ...showFeedbacks, valueOfPayment: true });
                }
                else if (values.valueOfPayment.toString().length > 6) {
                    errors['valueOfPayment'] = 'Valor muito alto';
                    setShowFeedbacks({ ...showFeedbacks, valueOfPayment: true });
                }
                else {
                    setShowFeedbacks({ ...showFeedbacks, valueOfPayment: false });
                }
                return errors;
            }}

            onSubmit={(values, errors) => {
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
                <Form onSubmit={handleSubmit} noValidate validated={false} ref={refValue[0]}>
                    <Row className="d-flex justify-content-center align-content-center" style={{ height: '100vh' }}>
                        <Col sm={9} md={6} xl={6} className="shadow" style={{ backgroundColor: 'white', borderRadius: '1.5rem' }}>
                            <Row className={`${Styles.textFontBlue} mx-2`}>
                                <Col>Informe o valor do pagamento</Col>
                            </Row>
                            <Row className={`${Styles.textFontGlay} mx-2`}>
                                <Form.Label>Valor</Form.Label>
                                <InputGroup>
                                    <Col sm={1} md={2} xl={1}>
                                        <InputGroup.Text className="inputStyleDefault">{currentCoin}</InputGroup.Text>
                                    </Col>
                                    <Col sm md xl>
                                        <FormControl className="inputStyleDefault"
                                            placeholder="Valor"
                                            aria-label="Valor"
                                            aria-describedby="Valor"
                                            type='number'
                                            size='lg'
                                            id="input_currentValueOfPayment"
                                            name="valueOfPayment"
                                            isInvalid={showFeedbacks.valueOfPayment}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.valueOfPayment}
                                        >
                                        </FormControl>
                                        <Form.Control.Feedback type="invalid" id="feedback_currentValueOfPayment">
                                            {errors.valueOfPayment}
                                        </Form.Control.Feedback>
                                    </Col>
                                    <Col sm={3} md={3} xl={2} style={{ marginRight: '-1vw', marginLeft: '0.5vw' }} >
                                        <Form.Select className="inputStyleDefault " onChange={changeCoin}>
                                            <option value="1">BRL</option>
                                            <option value="2">USD</option>
                                            <option value="3">EUR</option>
                                        </Form.Select>
                                    </Col>
                                </InputGroup>
                            </Row>
                            <Row className="mx-5 my-4" >
                                <Col style={{ width: '100%', textDecoration: 'none' }} className="justify-content-center">
                                    <Button type='submit' className="buttonBlue">Próximo</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            )}
        </Formik>
    );
}

export default PageInfoValueOfPayment;
