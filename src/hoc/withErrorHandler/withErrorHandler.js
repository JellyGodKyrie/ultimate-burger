import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = Axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = Axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount () {
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmed = () => {
            this.setState({error: null}); 
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    } 
}

export default withErrorHandler;
