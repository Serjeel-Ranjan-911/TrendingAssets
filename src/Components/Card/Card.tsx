import React, { FC } from 'react'
import style from './Card.module.scss'

interface asset {
    id: string
    name: string
    symbol: string
    image: string
    current_price: number
    market_cap: number
    market_cap_rank: number
    price_change_percentage_24h: number
}

interface CardProps {
    asset: asset
    popularPairs: Array<string>
}

const Card: FC<CardProps> = ({ asset, popularPairs }) => {
    return (
        <div className={style.card}>
            <div className={style.iconLogo}>
                <img
                    src={asset.image}
                    alt={asset.name}
                    className={style.iconImage}
                />
            </div>
            <h2 className={style.cardText}>{`${
                asset.name
            } (${asset.symbol.toUpperCase()})`}</h2>
            <div className={style.priceBox}>
                <p className={style.price}>
                    {'$' + asset.current_price.toLocaleString()}
                </p>

                <p
                    className={`${style.percentageChange} ${
                        asset.price_change_percentage_24h < 0
                            ? style.red
                            : style.green
                    }`}
                >
                    {(asset.price_change_percentage_24h < 0 ? '' : '+') +
                        asset.price_change_percentage_24h.toFixed(2) +
                        '%'}
                </p>
            </div>
            <h2 className={style.cardText}>Price</h2>
            <div className={style.priceBox}>
                <p className={style.price}>
                    {'$' + asset.market_cap.toLocaleString()}
                </p>
            </div>
            <h2 className={style.cardText}>TVL</h2>
            <div className={style.popularBox}>
                {popularPairs.map((image) => (
                    <img
                        className={style.popularIconImage}
                        src={image}
                        alt=""
                    />
                ))}
            </div>
            <h2 className={style.cardText}>Popular pairs</h2>
        </div>
    )
}
export default Card
