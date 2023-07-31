import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


const passwordReducer = (state, action) => { // hàm này quản lý state của password input
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
}

const Login = (props) => { // Component Login nhận vào props và nó sử dụng 2 React hook, useState và useReducer
    const [formIsValid, setFormIsValid] = useState(false);

    const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null }); // passwordState là state được quản lý bằng hook useReducer và hàm passwordReducer. Trong state chứa giá trị ban đầu là rỗng và tính hợp lệ là false

    // dòng này tách thuộc tính isValid từ passwordState
    const { isValid: passwordIsValid } = passwordState; // tương đương với const passwordIsValid = passwordState.isValid;

    useEffect(() => { // 
        const identifier = setTimeout(() => {
            console.log('Check validity!');
            setFormIsValid(passwordIsValid);
        }, 500);

        return () => {
            console.log('CLEAN UP');
            clearTimeout(identifier);
        };
    }, [passwordIsValid]);

    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value })

    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' })
    };

    const submitHandler = (event) => {
        event.preventDefault();
        props.onLogin(passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <div
                    className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
                        }`}
                >
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={passwordState.value}
                        onChange={passwordChangeHandler}
                        onBlur={validatePasswordHandler}
                    />
                </div>
                <div className={classes.actions}>
                    <Button type="submit" className={classes.btn} disabled={!formIsValid}>
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
