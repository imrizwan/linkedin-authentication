import React, { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import { Button, Layout } from "antd"
import crypto from 'crypto';
// import { Login } from "../features/authSlice"
import { ENV } from "../config";
const { Content } = Layout;
export default function Signin() {
    // const dispatch = useDispatch();
    const connectLinkedIn = () => {
        const { clientId, redirectUri, scope } = ENV
        const state = crypto.randomBytes(20).toString('hex');
        let url;
        url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=${scope}`;
        window.open(url, '_self');
    };
    useEffect(() => {

    }, []);

    return (
        <Layout>
            <Content style={{ height: "100vh", display: "flex", justifyContent: 'center', alignItems: "center" }}>
                <Button type="primary" onClick={connectLinkedIn} >Login with LinkedIn</Button>
            </Content>
        </Layout>
    )
}