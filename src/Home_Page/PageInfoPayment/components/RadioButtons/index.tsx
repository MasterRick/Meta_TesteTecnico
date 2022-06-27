import React,{FC} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import { PropsType } from './model'

const RadioButtons: FC<PropsType> = (props) => {
    return (
        <>
            <Row className={`textFontBlue mx-2`}>
                <Col>Informe os dados do pagamento</Col>
            </Row>
            <Row className={`textFontGlay mx-2`}>
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

export default RadioButtons;