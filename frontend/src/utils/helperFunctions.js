import axios from 'axios';

export const sendData = async (tag, type, token) => {

    let response = await axios({
                        method: 'post',
                        url: 'http://127.0.0.1:5000/tag',
                        data: {
                            tag: tag,
                            type: type,
                            token: token
                        }}).then((res) => {
                            return res  
                        }).catch((err) => {
                            console.log(err)
                        })
    
    return response.data

}

const getTweets = async () => {
    let response = await axios({
                            method: "get",
                            url: "http://127.0.0.1:5000/tweets"
                                }).then((res) => {
                                    return res
                                }).catch((err) => {
                                    console.log(err)
                                })
                            
    if(response){
        return response.data
    }
    return null
}

export const getData = async (type) => {
    switch(type){
        case "tweets":
            return await getTweets()
        default:
            break
    }
}