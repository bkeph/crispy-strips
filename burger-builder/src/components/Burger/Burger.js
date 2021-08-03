import CSSModule from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { Fragment } from 'react';

const burger = props => {
    const constructBurger = () => {
        let burgerInsides = [];

        for (const key in props.ingredients) {
            for(let i = props.ingredients[key]; i > 0; i--)
                burgerInsides.push(<BurgerIngredient 
                    type = {key} 
                    key = {`${key}_${i}`}/>);
        }
    
        if(burgerInsides.length === 0)
            burgerInsides.push(
                <p key = {"emptyBurger"}> Please add ingredients! </p>
            );

        return (
            <div className = {props.finalSnapshot ? CSSModule.BurgerWrapperAlt : CSSModule.BurgerWrapper}>
                <div className = {CSSModule.Burger}>
                    <BurgerIngredient type = "bread-top" />

                    {burgerInsides}
                    
                    <BurgerIngredient type = "bread-bottom" />
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            {constructBurger()}
        </Fragment>

    );
};

export default burger;