import { FormikHelpers } from 'formik'

export type FormValuesType = {
    cardName: string,
    cardNumber: string,
    cardExpiration: string,
    cardCVC: string,
}

export type PropsType = {
    clickNextStage: () => void,
}

export type showFeedbacksType = {
    cardName: boolean,
    cardNumber: boolean,
    cardExpiration: boolean,
    cardCVC: boolean,
}


export interface PageInfoValueOfPaymentInterface {
    validadeForm(values: FormValuesType): void
    submitForm(values: FormValuesType, errors: FormikHelpers<FormValuesType>): void
}





