import React from 'react';
import Button from "../Button/Button";
import './ProductItem.scss';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>
                <h2>
                    <span>
                        {product.title}
                    </span>
                </h2>
            </div>
            <div className={'price'}>
                <span>Стоимость: <b>{product.price}</b></span>
            </div>
            <div className={'description'}>{product.description}</div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;