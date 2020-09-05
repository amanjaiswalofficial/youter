import axios from 'axios';

export const sendData = async (tag, type) => {

    let response = await axios({
                        method: 'post',
                        url: 'http://127.0.0.1:5000/tag',
                        data: {
                            tag: tag,
                            type: type
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
                            
    return response.data
}

export const getData = async (type) => {
    switch(type){
        case "tweets":
            return await getTweets()
        default:
            break
    }
}