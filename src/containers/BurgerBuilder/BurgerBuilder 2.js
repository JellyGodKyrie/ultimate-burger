/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Axios from "../../axios-order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionTypes from "../../store/actions";

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        console.log(this.props);
        // Axios.get("https://ultimate-burger-faf72.firebaseio.com/ingredients.json")
        //     .then((response) => {
        //         this.setState({ ingredients: response.data });
        //     })
        //     // eslint-disable-next-line no-unused-vars
        //     .catch((error) => {
        //         this.setState({ error: true });
        //     });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.history.push("/checkout");
    };

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((acc, el) => {
                return acc + el;
            }, 0);
        return sum > 0;
    }

    render() {
        const disabledInfo = {
            ...this.props.ing
        };
        // eslint-disable-next-line
        for (const key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;

        // eslint-disable-next-line react/no-unescaped-entities
        let burger = this.state.error ? (
            <p>Ingredients can&apos;t be loaded!</p>
        ) : (
            <Spinner />
        );

        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        price={this.props.price}
                    />
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ing}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName
            }),
        onIngredientRemoved: (ingName) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, Axios));
