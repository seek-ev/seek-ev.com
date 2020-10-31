import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'

// Styles
import './connections.sass'

// Icons
import { FaDiscord, FaPatreon } from 'react-icons/fa'

// Components
import { SettingsConnection } from './connection/index'

// Actions
import { showSnackbar } from '../../../actions/snackbar'

const SettingsConnections = (props) => {
    const [connections, setConnections] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingConnections, setLoadingConnections] = useState(false)
    const dispatch = useDispatch()


    const fetchConnections = async () => {
        setLoadingConnections(true)
        await axios.get('/users/@me/connections').then(res => setConnections(res.data))
        setLoadingConnections(false)
    }

    useEffect(() => {
        async function saveConnection() {
            setLoading(true)
            const params = props.params.replace('?', '').split('&')

            if (params[0].includes('type=') && params[1].includes('code=')) {
                await axios.post(`/users/@me/connection/${params[0].split('=')[1]}`, {
                    code: params[1].split('=')[1]
                }).then(res => {
                    dispatch(showSnackbar(`${res.data.connection.type} connected`, 'success'))
                    fetchConnections()
                }).catch(err => dispatch(showSnackbar(err, 'error')))
            }
            setLoading(false)
        }

        if (props.params) {
            saveConnection()
        }


        fetchConnections()
    }, [props.params, dispatch])

    const onLoading = (loading, revoked) => {
        setLoading(loading)
        if (revoked) fetchConnections()
    }

    return (
        <div className="settings-connections">
            <div className="settings-connections-title">
                Your connections
            </div>

            <div className={connections.length > 0 ? 'settings-connections-list' : 'settings-connections-hidden'}>
                {connections.map(c => {
                    return <SettingsConnection connection={c} key={c.type} onLoading={onLoading} />
                })}
            </div>
            <div className={connections.length <= 0 ? 'settings-connections-list' : 'settings-connections-hidden'}>
                No connections yet
            </div>

            <div className={connections.length === 2 ? 'settings-connections-hidden' : 'settings-connections-create'}>
                <div className="connect-title">
                    Connect:
            </div>
                <a className={connections.some(c => c.type === 'discord') ? 'settings-connections-hidden' : 'connect-button discord'} href="https://discord.com/api/oauth2/authorize?client_id=745299401160786010&redirect_uri=https%3A%2F%2Fseek-ev.com%2Fsettings%3Ftype%3Ddiscord&response_type=code&scope=identify%20guilds">
                    Discord <div className="connect-icon"><FaDiscord /></div>
                </a>
                <a className={connections.some(c => c.type === 'patreon') ? 'settings-connections-hidden' : 'connect-button patreon'} href="https://www.patreon.com/oauth2/authorize?response_type=code&client_id=gJy5qU6eqaMwRCvtrPW882W9DeGsYSraXkRKWsWDyYsQo38Lu3TmAcHXU-6lFhKi&redirect_uri=https://seek-ev.com/settings?type=patreon&scope=identity">
                    Patreon <div className="connect-icon"><FaPatreon /></div>
                </a>
            </div>

            <div className={loading ? 'loading' : ''}>
                <div className={loading ? 'loader' : ''}></div>
            </div>


            <div className={loadingConnections ? 'loader' : ''}></div>

        </div>
    )
}

export { SettingsConnections }