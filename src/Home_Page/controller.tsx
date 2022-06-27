
import { Dispatch, RefObject } from 'react'

import { HomeControllerInterface } from './model'


export class HomeController implements HomeControllerInterface {

    private setStage: Dispatch<React.SetStateAction<number>>
    private stageDOM: RefObject<HTMLFormElement>[]

    constructor(setStage, stageDOM) {
        this.setStage = setStage;
        this.stageDOM = stageDOM;
    }

    clickNextStage = () => {
        for (let i = 0; i < this.stageDOM.length; i++) {
            let aux = this.stageDOM[i].current;
            if (aux !== null)
                aux.style.display = "none";
        }

        this.setStage((state) => {
            let aux = this.stageDOM[state + 1].current;
            if (aux !== null)
                aux.style.display = "block";

            return state + 1;
        });
    }

    clickPreviousStage = () => {
        for (let i = 0; i < this.stageDOM.length; i++) {
            let aux = this.stageDOM[i].current;
            if (aux !== null)
                aux.style.display = "none";
        }

        this.setStage((state) => {

            let aux = this.stageDOM[state - 1].current;
            if (aux !== null)
                aux.style.display = "block";

            return state - 1;
        });

    }
}


