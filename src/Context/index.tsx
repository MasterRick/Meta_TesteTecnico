import React, { createContext } from 'react';

import { ContextType } from './model'

export default createContext<ContextType>({
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
                valueOfPaymentBRL: 0
            },
           
        }
    },
    setInformations: () => { },
    currentValueOfPayment: 0,
    setCurrentValueOfPayment: () => { },
    currentCoin: "",
    setCurrentCoin: () => { },
});
