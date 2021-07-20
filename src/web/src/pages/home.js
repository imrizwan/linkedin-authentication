import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { me } from "../features/authSlice"
export default function Auth() {
    const dispatch = useDispatch();
    const { doneMe, err, data } = useSelector(state => state.auth);
    const [errors, setErrors] = React.useState({})
    const [fullName, setFullname] = React.useState("")
    useEffect(() => {
        dispatch(me())
    }, []);

    useEffect(() => {
        if (doneMe) {
            if (data) {
                setFullname(data?.fullName)
            }
        }
        if (err) {
            setErrors({
                error: err
            })
        }
    }, [doneMe]);
    return (
        <div>
            {errors?.error ? <div>{errors?.error}</div> : <div>
                <div>
                    {data?.profilePicture && <img src={data?.profilePicture} />}
                </div>
                <div>
                    {fullName}
                </div>
            </div>}
        </div>
    )
}
