import React from 'react'
import { Helmet } from 'react-helmet'

// Styles
import { Wrapper } from './styles'

// Components
import { Landing } from 'components/pages/landing'

const LandingPage = () => {
    return (
        <Wrapper>
            <Helmet>
                <title>Seek EV</title>
                <meta name="description" content="Join us on the way to the future" />

                <meta property="og:title" content="Seek EV" />
                <meta property="og:description" content="Join us on the way to the future" />
                <meta property="og:image" content="https://seekev.s3.eu-central-1.amazonaws.com/assets/se_dark.png" />
            </Helmet>

            <Landing />
        </Wrapper>
    )
}

export { LandingPage }