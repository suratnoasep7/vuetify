import axios from 'axios'

export default {

    fetchData () {
        return axios.get('https://dev-api.paperdaz.com/api/packages')
            .then(response => {
                return response.data
            })
    }
}