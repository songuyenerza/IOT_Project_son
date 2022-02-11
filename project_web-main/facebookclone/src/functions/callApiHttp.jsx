import axios from 'axios'
import { REACT_APP_API_URL } from 'commons/constants'

const callApiHttp = ({ url, method, baseURL, data, params }) =>
    axios.create({
        baseURL: REACT_APP_API_URL,
        headers: {
            'x-access-token': `${localStorage.getItem('token')}`,
        },
    })({
        method,
        url,
        data,
        params,
    })

export default callApiHttp
