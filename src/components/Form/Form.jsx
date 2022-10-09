import React, {useCallback, useEffect, useState} from 'react';
import './Form.scss';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [userMail, setUserMail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [subject, setSubject] = useState('spotify');
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            userMail,
            userPassword,
            subject,
        }
        tg.sendData(JSON.stringify(data));
    }, [userMail, userPassword, subject])


    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, [])

    useEffect(() => {
        if(!userPassword || !userMail) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }, [userMail, userPassword])

    const onChangeUserMail = (e) => {
        setUserMail(e.target.value)
    }

    const onChangeUserPassword = (e) => {
        setUserPassword(e.target.value)
    }

    const onChangeSubject = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className={"form"}>
            <h3>Введите ваши данные</h3>
            <input
                className={'input'}
                type="text"
                placeholder={'Электронная почта/Имя пользователя'}
                value={userMail}
                onChange={onChangeUserMail}
            />
            <input
                className={'input'}
                type="text"
                placeholder={'Пароль'}
                value={userPassword}
                onChange={onChangeUserPassword}
            />
            <select value={subject} onChange={onChangeSubject} className={'select'}>
                <option value={'spotify'}>Spotify</option>
                <option value={'netflix'}>Netflix</option>
                <option value={'youtube'}>YouTube</option>
            </select>
        </div>
    );
};

export default Form;