import React, {useState} from 'react';
import './ProductList.scss';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import spotifyLogo from '../../img/spotify-logo.png';
import netflixLogo from '../../img/netflix-logo.png';
import youtubeLogo from '../../img/youtube-logo.png';

const products = [
    // {id: '1', title: 'Spotify', price: 299,
    //     img: spotifyLogo,
    //     description: '1 месяц'},
    {id: '2', title: 'Netflix', price: 799,
        img: netflixLogo,
        description: '1 месяц'},
    {id: '3', title: 'Youtube', price: 229,
        img: youtubeLogo,
        description: '1 месяц'},


    // {id: '4', title: 'VPN', price: "от 199р/мес", description: 'Зеленого цвета, теплая'},
    // {id: '5', title: 'iTunes', price: "от 219р/мес", description: 'Синего цвета, прямые'},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
}

const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            products: addedItems,
            totalPrice: getTotalPrice(addedItems),
            queryId,
        }
        fetch('http://localhost:8000/web-data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }, [addedItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
        <div className={'list'}>
            {products.map(item => (
                <ProductItem
                    product={item}
                    onAdd={onAdd}
                    className={'item'}
                />
            ))}
        </div>
    );
};

export default ProductList;