import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Layout } from "antd"
import { unescape } from 'lodash'
import { checkCode } from "../features/authSlice"
import "./style.css"
export default function Auth() {
    const history = useHistory()
    const dispatch = useDispatch();
    const { done, err } = useSelector(state => state.auth);
    const [errors, setErrors] = React.useState({})
    useEffect(() => {
        let newParams = new URLSearchParams(window.location.search);
        let code = newParams.get("code");
        let error_description = newParams.get("error_description");
        if (error_description) {
            setErrors({
                error: unescape(error_description)
            })
        }
        if (code) {
            dispatch(checkCode({ code }))
        }
    }, []);

    useEffect(() => {
        if (done) {
            history.push("/home");
        }
        if (err) {
            setErrors({
                error: err
            })
        }
    }, [done]);

    return (
        <Layout style={{ height: '100vh', justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
            {errors?.error && <div className="error">{errors?.error}</div>}
        </Layout>
    )
}