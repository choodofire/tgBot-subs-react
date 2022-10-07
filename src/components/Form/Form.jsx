import React, {useCallback, useEffect, useState} from 'react';
import './Form.css'
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState();
    const [street, setStreet] = useState();
    const [subject, setSubject] = useState();
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
            const data = {
                country,
                street,
                subject,
            }
            tg.sendData(JSON.stringify(data))
        }, []
    )

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                tg.offEvent('mainButtonClicked', onSendData)
            }
    }, [])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    // useEffect(() => {
    //     if (!street || !country) {
    //         tg.MainButton.hide()
    //     } else {
    //         tg.MainButton.show()
    //     }
    // }, [country, street])

    tg.MainButton.show()

    const onChangeCountry = () => {
        setCountry(e.target.value)
    }

    const onChangeStreet = () => {
        setStreet(e.target.value)
    }

    const onChangeSubject = () => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Адрес электронной почты/Имя пользователя'}
                value={country}
                onChange={onChangeCountry}
            />

            <input
                className={'input'}
                type="text"
                placeholder={'Пароль'}
                value={street}
                onChange={onChangeStreet}
            />

            <select className={'select'} value={subject} onChange={onChangeSubject}>
                <option value={'physical'}>Netflix</option>
                <option value={'legal'}>Spotify</option>
            </select>
        </div>
    );
};
export default Form;