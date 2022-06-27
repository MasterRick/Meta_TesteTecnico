import { FormikHelpers } from 'formik'

export type FormValuesType = {
    cardName: string,
    cardNumber: string,
    cardExpiration: string,
    cardCVC: string,
}

export type PropsType = {
    clickNextStage: () => void,
    clickPreviousStage: () => void,
}

export type showFeedbacksType = {
    cardName: boolean,
    cardNumber: boolean,
    cardExpiration: boolean,
    cardCVC: boolean,
}


export interface PageInfoPaymentInterface {
    validadeForm(values: FormValuesType): void
    submitForm(values: FormValuesType, errors: FormikHelpers<FormValuesType>): void
}





