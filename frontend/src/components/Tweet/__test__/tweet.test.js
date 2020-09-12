// Library imports
import React from "react"
import { render,  cleanup } from "@testing-library/react"

// Custom imports
import Tweet from 'components/Tweet'
import {sampleTweets} from "utils/constants"

afterEach(() => {
    cleanup()
})

// Sample test case to test if component rendered correctly
it("Should ensure Tweet rendered correctly", () => {
    render(<Tweet data={sampleTweets[0]}/>)
})
