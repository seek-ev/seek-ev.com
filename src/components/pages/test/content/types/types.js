import styled from 'styled-components/macro'

// Variables
import { maxSize } from 'assets/variables'

// Components
import { Input } from 'components/basic/input'
import { Checkbox } from 'components/basic/checkbox'

const Wrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0px 0px 10px;
`

const TInput = styled(Input)`
    max-width: 200px;
    margin: 12px 7px 0 0;

    @media only screen and (max-width: ${maxSize.medium}) {
        max-width: 100%;
    }
`


const TCheckbox = styled(Checkbox)`
    max-width: 200px;
    margin: 12px 7px 0 0;

    @media only screen and (max-width: ${maxSize.medium}) {
        max-width: 100%;
    }
`

const Times = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

const Note = styled.div`
    margin: 14px 0 0;
    font-weight: 500;
    align-self: flex-end;
    font-size: 12px;
`

export { Wrapper, TInput, TCheckbox, Times, Note }