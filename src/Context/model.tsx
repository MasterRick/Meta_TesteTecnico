import { RefObject } from 'react';

export type InformationsType = {
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
            cardName?: string,
            cardNumber?: string,
            cardExpiration?: string,
            cardCVC?: string,
            valueOfPaymentBRL: number,
        },
        
    }


}

export type ContextType = {
    refValue: RefObject<HTMLFormElement>[];
    informations: InformationsType;
    setInformations: (value: InformationsType) => void;
    currentValueOfPayment: number;
    setCurrentValueOfPayment: (value: number) => void;
    currentCoin: string;
    setCurrentCoin: (value: string) => void;
}