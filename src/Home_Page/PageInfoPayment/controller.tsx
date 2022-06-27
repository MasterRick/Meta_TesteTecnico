
import { Dispatch } from 'react'

import { PageInfoPaymentInterface, showFeedbacksType } from './model'
import { InformationsType } from '../../Context/model'


export class PageInfoPaymentController implements PageInfoPaymentInterface {

    private setShowFeedbacks: Dispatch<React.SetStateAction<showFeedbacksType>>
    private informations: InformationsType
    private setInformations: Dispatch<React.SetStateAction<InformationsType>>
    private clickNextStage: () => void
    private currentOptionOfPayment: string

    constructor(setShowFeedbacks, informations, setInformations, clickNextStage, currentOptionOfPayment) {
        this.setShowFeedbacks = setShowFeedbacks;
        this.informations = informations;
        this.setInformations = setInformations;
        this.clickNextStage = clickNextStage;
        this.currentOptionOfPayment = currentOptionOfPayment;

    }

    validadeForm = (values) => {
        let errors = {};

        if (!values.cardName) {
            errors['cardName'] = 'Coloque o nome do titular';
            this.setShowFeedbacks((state) => {
                return { ...state, cardName: true };
            });
        } else {
            this.setShowFeedbacks((state) => {
                return { ...state, cardName: false };
            });
        }

        if (!values.cardNumber) {
            errors['cardNumber'] = 'Coloque o número do cartão';
            this.setShowFeedbacks((state) => {
                return { ...state, cardNumber: true };
            });
        }

        else if (values.cardNumber.length < 19) {
            errors['cardNumber'] = 'Número do cartão inválido';
            this.setShowFeedbacks((state) => {
                return { ...state, cardNumber: true };
            });
        }

        else {
            this.setShowFeedbacks((state) => {
                return { ...state, cardNumber: false };
            });
        }

        if (!values.cardExpiration) {
            errors['cardExpiration'] = 'Coloque a validade do cartão';
            this.setShowFeedbacks((state) => {
                return { ...state, cardExpiration: true };
            });
        }

        else if (values.cardExpiration.length < 5) {
            errors['cardExpiration'] = 'Validade inválida';
            this.setShowFeedbacks((state) => {
                return { ...state, cardExpiration: true };
            });
        }

        else {
            this.setShowFeedbacks((state) => {
                return { ...state, cardExpiration: false };
            });
        }

        if (!values.cardCVC) {
            errors['cardCVC'] = 'Coloque o CVC';
            this.setShowFeedbacks((state) => {
                return { ...state, cardCVC: true };
            });
        }

        else if (values.cardCVC.length < 3) {
            errors['cardCVC'] = 'CVC inválido';
            this.setShowFeedbacks((state) => {
                return { ...state, cardCVC: true };
            });
        }

        else {
            this.setShowFeedbacks((state) => {
                return { ...state, cardCVC: false };
            });
        }

        return errors;
    }


    submitForm = (values, errors) => {
        this.setInformations({
            ...this.informations, payment: {
                type: 'Cartão',
                info: {
                    cardName: values.cardName,
                    cardNumber: values.cardNumber,
                    cardExpiration: values.cardExpiration,
                    cardCVC: values.cardCVC,
                    valueOfPaymentBRL: this.informations.payment.info.valueOfPaymentBRL,
                },
            }
        });
        this.clickNextStage();
    }

    validadeForm2 = (values) => {
        let errors = {};

        if (!values.cpfNumber) {
            errors['cpfNumber'] = 'Coloque seu CPF';
            this.setShowFeedbacks((state) => {
                return { ...state, cpfNumber: true };
            });
        } else if (values.cpfNumber.length < 14) {
            errors['cpfNumber'] = 'CPF inválido';
            this.setShowFeedbacks((state) => {
                return { ...state, cpfNumber: true };
            });
        }
        else {
            this.setShowFeedbacks((state) => {
                return { ...state, cpfNumber: false };
            });
        }
        return errors;
    }

    submitForm2 = (values, errors) => {
        this.setInformations({
            ...this.informations, payment: {
                type: this.currentOptionOfPayment === "1" ? 'Boleto' : 'PIX',
                info: {
                    cpf: values.cpfNumber,
                    valueOfPaymentBRL: this.informations.payment.info.valueOfPaymentBRL,
                },
               
            }
        });
        this.clickNextStage();
    }
}


