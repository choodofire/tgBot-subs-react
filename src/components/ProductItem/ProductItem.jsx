import React from 'react';
import Button from "../Button/Button";
import './ProductItem.scss';

const ProductItem = ({product, className, onAdd}) => {

    const onAddHandler = () => {
        onAdd(product);
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}>
                <img src={product.img} alt="Нет картинки"/>
            </div>
            <div className={'title'}>
                <h2>{product.title}</h2>
            </div>
            <div className={'description'}>
                <h3>{product.description}</h3>
            </div>
            <div className={'price'}>
                <span>Стоимость: <br/> <b>{product.priceMonth}</b>р/мес</span>
            </div>

            <Button className={'add-btn'} onClick={onAddHandler}>
                Добавить в корзину
            </Button>
        </div>
    );
};

export default ProductItem;