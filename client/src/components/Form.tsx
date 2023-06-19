import React, {Ref, useEffect, useRef, useState} from 'react'
import Input from "./Input";
import searchImg from "../img/search.svg";
import {isValidateEmail, isValidateNumber, numberMask, toNumber} from "../utils/utils";
import {useDebounce} from "../hooks/debounce.hook";

interface FormProps {
    onClickQuery: (email: string, number: string) => void
}
const Form = ({onClickQuery}: FormProps) => {
    const refEmail = useRef<HTMLInputElement>(null)
    const refNumber = useRef<HTMLInputElement>(null)

    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')

    const debouncedEmail = useDebounce<string>(email, 700)
    const debouncedNumber = useDebounce<string>(number, 700)

    const changeEmailHandler  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }
    const changeNumberHandler  = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNumber(numberMask(event.target.value))
    }

    useEffect(() => {
        if (email !== '' && !isValidateEmail(email)) {
            refEmail.current?.classList.add('error')
        } else {
            refEmail.current?.classList.remove('error')
        }
    }, [debouncedEmail])

    useEffect(() => {
        if (!isValidateNumber(number)) {
            refNumber.current?.classList.add('error')
        } else {
            refNumber.current?.classList.remove('error')
        }
    }, [debouncedNumber])


    const onClickValidate  = (): boolean => {
        let error  = 0
        if(!isValidateEmail(email)) {
            refEmail.current?.classList.add('error')
            error++
        }
        if (!isValidateNumber(number)) {
            refNumber.current?.classList.add('error')
            error++
        }
        return error === 0
    }

    return (
        <>
            <Input
                ref={refEmail}
                id="email"
                type="text"
                name="email"
                placeholder="Введите email*"
                value={email}
                onChange={changeEmailHandler}
            />
            <Input
                ref={refNumber}
                id="number"
                type="text"
                name="number"
                placeholder="Введите номер"
                value={number}
                onChange={changeNumberHandler}
            />
            <button className="main__btn" onClick={() => onClickValidate() ? onClickQuery(email,toNumber(number)) : {}}>
                <img src={searchImg} alt=""/>
            </button>
        </>
    )
}

export default Form