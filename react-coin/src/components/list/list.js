import React from 'react';
import { handleResponse } from '../../helper';
import { API_URL } from "../../config";
import './Table.css';
import Loading from '../common/Loading';

// for simple presentation use local functional componentes
//use only class components if you use state or lifecycle components

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
        };
    }

    componentDidMount () {
        this.setState({
            loading: true
        });

        fetch(API_URL + '/cryptocurrencies?page=1&perPage=50')
            .then(handleResponse)
            .then((data) => {
                this.setState({
                    currencies: data.currencies,
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

    renderChangePercent(percent) {
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

    render () {

        const { loading, error, currencies } = this.state;

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
            <div className="Table-container">
                <table className="Table">
                    <thead className="Table-head">
                        <tr>
                            <th>Cryptocurrency</th>
                            <th>Price</th>
                            <th>Market Cap</th>
                            <th>24H Change</th>
                        </tr>
                    </thead>
                    <tbody className="Table-body">
                    {currencies.map((currency) => (
                        <tr key={currency.id}>
                            <td>
                               <span className="Table-rank">
                                   {currency.rank}
                               </span>
                                {currency.name}
                            </td>
                            <td>
                                <span className="Table-dollar">
                                    $ {currency.price}
                                </span>
                            </td>
                            <td>
                               <span className="Table-dollar">
                                   $ {currency.marketCap}
                               </span>
                            </td>
                            <td>
                                <span>
                                    {this.renderChangePercent(currency.percentChange24h)}
                                </span>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;