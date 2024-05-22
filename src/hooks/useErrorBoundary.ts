import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useRouteError } from 'react-router-dom';
import { setErrorCatch } from '../redux/App/slice';

export default function ErrorBoundary() {
    const dispatch = useDispatch()
    const error = useRouteError()
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            dispatch(setErrorCatch(error))
            navigate('/')
        }
    }, [dispatch, error, navigate])
    return null
}
