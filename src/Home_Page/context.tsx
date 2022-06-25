import React, { createContext, RefObject } from 'react';

interface InformationsInterface {
    name: string,
    email: string,
    cep: string,
    city: string,
    state: string,
    address: string,
    number: string,
    complement: string,
    payment: {
        type: string,
        info: {
            cpf?: string,
            cardName?: string
            cardNumber?: string
            cardExpiration?: string
            cardCVC?: string
        },
        valueOfPaymentBRL: number,
    }


}

interface IThemeContext {
    refValue: RefObject<HTMLFormElement>[];
    informations: InformationsInterface;
    setInformations: (value: InformationsInterface) => void;
    currentValueOfPayment: number;
    setCurrentValueOfPayment: (value: number) => void;
    currentCoin: string;
    setCurrentCoin: (value: string) => void;
}

const Context = createContext<IThemeContext>({
    refValue: [React.createRef<HTMLFormElement>(), React.createRef<HTMLFormElement>(), React.createRef<HTMLFormElement>(), React.createRef<HTMLFormElement>()],
    informations: {
        name: '',
        email: '',
        cep: '',
        city: '',
        state: '',
        address: '',
        number: '',
        complement: '',
        payment: {
            type: '',
            info: {

            },
            valueOfPaymentBRL: 0,
        }
    },
    setInformations: () => { },
    currentValueOfPayment: 0,
    setCurrentValueOfPayment: () => { },
    currentCoin: "",
    setCurrentCoin: () => { },
});

export default Context;