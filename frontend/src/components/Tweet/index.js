import React from 'react'
import {Box} from 'rebass'

const Tweet = ({data}) => {
    return (
        <div>
        <Box
        style={{height: "150px"}}
        width={[ 0.60, 0.60, 1 ]}
        color='black'
        bg='primary'>
            <img src={data["profile_image_url"]} alt=""/>
            {data.name}
            <strong>{data["user_name"]}</strong>
            {data["received_at"]}
            {data.text}
        </Box>
        </div>
    )
}

export default Tweet
