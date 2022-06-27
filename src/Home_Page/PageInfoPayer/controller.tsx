
import { Dispatch } from 'react'

import CurrencyAPI from '../../Apis/Currency_Api/api';
import AddressAPI from '../../Apis/Address_Api/api';

import { PageInfoPayerControllerInterface, showFeedbacks } from './model'
import { InformationsType } from '../../Context/model'


export class PageInfoPayerController implements PageInfoPayerControllerInterface {

    private setShowFeedbacks: Dispatch<React.SetStateAction<showFeedbacks>>
    private informations: InformationsType
    private setInformations: Dispatch<React.SetStateAction<InformationsType>>
    private currentCurrency: number
    private currentValueOfPayment: number
    private clickNextStage: () => void

    constructor(setShowFeedbacks, informations, setInformations, currentCurrency, currentValueOfPayment, clickNextStage) {
        this.setShowFeedbacks = setShowFeedbacks;
        this.informations = informations;
        this.setInformations = setInformations;
        this.currentCurrency = currentCurrency;
        this.currentValueOfPayment = currentValueOfPayment;
        this.clickNextStage = clickNextStage;

    }

    GetCurrencyInformations = async (params, setCurrentCurrency) => {
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

    GetAddressInformations = async (params,) => {
        //setIsLoading(true);
        return await AddressAPI.get(`/${params}/json`).then((response) => {
            return response;
        }).then(data => {

            if (data.data.erro === "true") {
                this.setShowFeedbacks((state) => {
                    return { ...state, cep: true };
                });
                return true;
            } else {
                this.setInformations(
                    { ...this.informations, cep: data.data.cep, city: data.data.localidade, state: data.data.uf, address: data.data.logradouro }
                );

                this.setShowFeedbacks((state) => {
                    return { ...state, cep: false };
                });
                return false;
            }

            //setIsLoading(false);
        }).catch((error) => {
            this.setShowFeedbacks((state) => {
                console.log(state);
                return { ...state, cep: true };
            });
            this.setInformations({ ...this.informations, cep: '', city: '', state: '', address: '', complement: '' });
            return true;
        });
    }

    validadeForm = async (values) => {
        let errors = {};

        if (!values.name) {
            errors['name'] = 'Coloque seu nome';
            this.setShowFeedbacks((state) => {
                return { ...state, name: true };
            });
        } else {
            this.setShowFeedbacks((state) => {
                return { ...state, name: false };
            });
        }

        if (!values.email) {
            errors['email'] = 'Coloque seu email';
            this.setShowFeedbacks((state) => {
                return { ...state, email: true };
            });
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
            errors['email'] = 'Insira um endereço de email válido';
            this.setShowFeedbacks((state) => {
                return { ...state, email: true };
            });
        } else {
            this.setShowFeedbacks((state) => {
                return { ...state, email: false };
            });
        }


        if (!values.cep) {
            errors['cep'] = 'Coloque seu CEP';
            this.setShowFeedbacks((state) => {
                return { ...state, cep: true };
            });
            this.setInformations({ ...this.informations, city: '', state: '', address: '', complement: '', number: '' });
        } else if (values.cep.length < 9) {
            errors['cep'] = 'CEP inválido';
            this.setShowFeedbacks((state) => {
                return { ...state, cep: true };
            });
            this.setInformations({ ...this.informations, city: '', state: '', address: '', complement: '', number: '' });
        }
        else {
            const testRequest = await this.GetAddressInformations(values.cep.replace("-", "").trim());

            if (testRequest) {
                errors['cep'] = 'CEP inválido';
                this.setShowFeedbacks((state) => {
                    return { ...state, cep: true };
                });
            }
        }

        if (!values.number) {
            errors['number'] = 'Sem número';
            this.setShowFeedbacks((state) => {
                return { ...state, number: true };
            });
        } else {
            this.setShowFeedbacks((state) => {
                return { ...state, number: false };
            });
        }
        return errors;
    }

    submitForm = (values, errors) => {
        this.setInformations({
            ...this.informations, name: values.name, email: values.email, cep: values.cep, complement: values.complement, number: values.number, payment: {
                type: '',
                info: {},
                valueOfPaymentBRL: this.currentCurrency * this.currentValueOfPayment,
            }
        });
        this.clickNextStage();
    }
}


