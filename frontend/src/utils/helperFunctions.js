import axios from 'axios';

export const sendData = async (tag, type) => {

    let response = await axios({
                        method: 'post',
                        url: 'http://127.0.0.1:5000/tag',
                        data: {
                            tag: tag,
                            type: type
                        }}).then((res) => {
                            console.log(res.data)
                            return res
                        }).catch((err) => {
                            console.log(err)
                        })
    
    return response.status

}
