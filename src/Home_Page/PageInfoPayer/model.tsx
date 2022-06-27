import { FormikHelpers } from 'formik'
import { Dispatch } from 'react'

import { InformationsType } from '../../Context/model'

export type FormValues = {
    name: string,
    email: string,
    cep: string,
    number: string,
    complement: string,
}

export type PropsType = {
    clickNextStage: () => void,
    clickPreviousStage: () => void,
}

export type showFeedbacks = {
    name: boolean;
    email: boolean;
    cep: boolean;
    number: boolean;
    complement: boolean;
}


export interface PageInfoPayerControllerInterface {

    GetCurrencyInformations(params: string, setCurrentCurrency: Dispatch<React.SetStateAction<number>>): void
    GetAddressInformations(params: string, setCurrentCurrency: Dispatch<React.SetStateAction<showFeedbacks>>, informations: InformationsType, setInformations: Dispatch<React.SetStateAction<InformationsType>>): void
    validadeForm(values: FormValues): void
    submitForm(values: FormValues, errors: FormikHelpers<FormValues>): void
}





