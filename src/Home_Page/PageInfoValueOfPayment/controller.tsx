
import { Dispatch } from 'react'

import { PageInfoValueOfPaymentInterface, showFeedbacksType } from './model'

export class PageInfoValueOfPaymentController implements PageInfoValueOfPaymentInterface {

    private setShowFeedbacks: Dispatch<React.SetStateAction<showFeedbacksType>>;
    private setCurrentValueOfPayment: (value: number) => void;
    private clickNextStage: () => void;

    constructor(setShowFeedbacks, setCurrentValueOfPayment, clickNextStage) {
        this.setShowFeedbacks = setShowFeedbacks;
        this.setCurrentValueOfPayment = setCurrentValueOfPayment;
        this.clickNextStage = clickNextStage;
    }

    validadeForm = (values) => {
        let errors = {};

        if (values.valueOfPayment <= 0) {
            errors['valueOfPayment'] = 'Valor para o pagamento deve ser maior que 0';

            this.setShowFeedbacks((state) => {
                return { ...state, valueOfPayment: true };
            });
        }
        else if (values.valueOfPayment.toString().length > 6) {
            errors['valueOfPayment'] = 'Valor muito alto';
            this.setShowFeedbacks((state) => {
                return { ...state, valueOfPayment: true };
            });
        }
        else {
            this.setShowFeedbacks((state) => {
                return { ...state, valueOfPayment: false };
            });
        }
        return errors;
    }


    submitForm = (values, errors) => {
        this.setCurrentValueOfPayment(values.valueOfPayment);
        this.clickNextStage();
    }

}


