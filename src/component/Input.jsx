import React, { useState } from "react";
import './Input.css'

const Input = (props) => {

    const [blur, setBlur] = useState(false);
    const [isInvalid, setIsInValid] = useState(false);
    let errorStyle = {
        display: 'block',
        marginTop: '.2rem',
        color: 'red',
        fontSize: '12px'
    }

    let borderError = {
        border: '1px solid red'
    }

    const onBlur = (event) => {
        setBlur(true)
        setIsInValid(blur && !props.value)
    }

    const onChangehandler = (event) => {
        props.onChange(event)
    }
    return <>
        <div style={props.style} className={props.className}>
            <label>{props.label}</label>
            <div>
                <input style={isInvalid && !props.value ? borderError : {}} type={props.type || 'text'} value={props.value} placeholder={props.placeholder || ''} onBlur={onBlur} onChange={onChangehandler} />
                {isInvalid && !props.value ? <span style={errorStyle}>{props.errorMessage}</span> : ''}
            </div>
        </div>
    </>
}

export default Input;