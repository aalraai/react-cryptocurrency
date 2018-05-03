import React from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from "../../config";
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

// for simple presentation use local functional componentes
//use only class components if you use state or lifecycle components
// for data that will going to change we have to use state
// props are fixed through their life time

class List extends React.Component {
    constructor () {
        super();

        //local state
        //this.state is never modified directly.
        //instead use this.setState function
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1,
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount () {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        const { page } = this.state;

        fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
                const { currencies, totalPages } = data;

                this.setState({
                    // when key / value has the same name we can , in ES6, refactor it to one name. object literal property
                    currencies,
                    totalPages,
                    loading: false,
                });
            })
            .catch((error) => {
                this.setState({
                    error: error.errorMessage,
                    loading: false,
                });
            });
    }

    static renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">
                {percent} % &uarr;
            </span>
        } else if (percent < 0) {
            return <span className="percent-fallen">
                {percent} % &darr;
            </span>
        } else {
            return <span> {percent} </span>
        }
    }

    handlePaginationClick(direction){
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => {
            //call fetchCurrencies function inside setStates call back
            //because we have to make sure first page state is updated
            this.fetchCurrencies();
        });
    }

    render () {

        const { loading, error, currencies, page, totalPages } = this.state;

        /*
        const loading = this.state.loading;
        const error = this.state.error;
        const currencies = this.state.currencies;
         */

        if (loading) {
            return <div className="loading-container">
                <Loading/>
            </div>
        }

        if (error) {
            return <div className="error">
                {error}
            </div>
        }

        return (
            <div>
                <Table
                    currencies={currencies}
                    renderChangePercent={List.renderChangePercent}
                />

                <Pagination
                    page={page}
                    totalPages={totalPages}
                    handlePaginationClick={this.handlePaginationClick}
                />
            </div>

        );
    }
}

export default List;