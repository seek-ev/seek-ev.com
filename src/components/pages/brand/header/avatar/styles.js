import styled from 'styled-components/macro'

const Wrapper = styled.div`
    height: 70px;
    width: 70px;
    border-radius: 7px;
    margin: 0 8px 0 0;
    border: 3px solid #fff;
    z-index: 1;
    overflow: hidden;
    background-color: #fff;

    img {
        width: auto;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
`

export { Wrapper }