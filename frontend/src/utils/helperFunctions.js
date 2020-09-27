import axios from 'axios';

import {backendURL} from "App"

export const sendData = async (tag, type, token) => {

    let url = backendURL + "/tag"

    let response = await axios({
                        method: 'post',
                        url: url,
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

    let url = backendURL + "/tweets"

    let response = await axios({
                            method: "get",
                            url: url
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