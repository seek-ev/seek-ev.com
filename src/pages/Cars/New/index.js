import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

// Style
import './new.sass'

// Components
import { Navbar } from '../../../components/navbar'
import { Button } from '../../../components/basic/button'
import { NewHeader } from '../../../components/cars/new/header'

// Actions
import { showSnackbar } from '../../../actions/snackbar'

class NewCar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            car: {},
            picture: null,
            categories: [],
            brands: [],
            loading: false,
            processing: false
        }

        this.createCar = this.createCar.bind(this)
        this.picChanged = this.picChanged.bind(this)
        this.modelChanged = this.modelChanged.bind(this)
        this.yearsChanged = this.yearsChanged.bind(this)
        this.brandChanged = this.brandChanged.bind(this)
        this.categoryChanged = this.categoryChanged.bind(this)
    }

    async componentDidMount() {
        this.setState({ loading: true })
        await axios.get('/categories').then(res => { this.setState({ categories: [{ id: 'none', hidden: true, name: 'Choose category' }, ...res.data] }) }).catch(err => this.props.showSnackbar(err, 'err'))
        await axios.get('/brands').then(res => { this.setState({ brands: [{ id: 'none', hidden: true, name: 'Choose brand' }, ...res.data] }) }).catch(err => this.props.showSnackbar(err, 'err'))
        this.setState({ loading: false })
    }

    async modelChanged(e) {
        await this.setState({ car: { ...this.state.car, model: e.value } })
    }

    async yearsChanged(e) {
        await this.setState({ car: { ...this.state.car, productionYears: e.value } })
    }

    async categoryChanged(e) {
        await this.setState({ car: { ...this.state.car, category: parseInt(e.value) } })
    }

    async brandChanged(e) {
        await this.setState({ car: { ...this.state.car, brand: parseInt(e.value) } })
    }

    async picChanged(pic) {
        this.setState({ picture: pic })
    }

    async createCar() {
        this.setState({ processing: true })

        await axios.post('/cars', this.state.car).then(async res => {
            if (!this.state.picture) return this.setState({ redirect: `/cars/${res.data.id}` })

            const fd = new FormData()
            fd.append('pictures', this.state.picture)

            await axios.post(`/cars/${res.data.id}/pictures`, fd, {
                headers: { 'Content-Type': 'multipart/form-data' },
            }).catch(err => this.props.showSnackbar(err, 'error'))
            return this.setState({ redirect: `/cars/${res.data.id}` })
        }).catch(async err => await this.props.showSnackbar(err, 'error'))

        if (!this.state.redirect) this.setState({ processing: false })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div className="container">
                <Navbar />
                <div className={`${this.state.loading ? 'new-car-hidden' : 'new-car-container'}`}>
                    <NewHeader categories={this.state.categories} brands={this.state.brands} modelChanged={this.modelChanged} yearsChanged={this.yearsChanged} categoryChanged={this.categoryChanged} brandChanged={this.brandChanged} picChanged={this.picChanged} />
                    <div className="new-car-submit">
                        <Button text="Create" raise primary onClick={() => this.createCar()} />
                    </div>
                </div>

                <div className={`${this.state.loading ? 'new-car-loading' : 'new-car-hidden'}`}></div>
                <div className={`${this.state.processing ? 'new-car-processing' : 'new-car-hidden'}`}>
                    <div className="new-car-processing-loading"></div>
                </div>
            </div>
        )
    }
}


export default connect(
    null,
    { showSnackbar }
)(NewCar)