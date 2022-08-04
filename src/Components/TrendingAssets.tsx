import React from 'react'
import ReactPaginate from 'react-paginate'
import style from './TrendingAssets.module.scss'
import Card from './Card/Card.tsx'

const TredningAssets = () => {
    const [trendingAssets, setTrendingAssets] = React.useState([])
    const [popularAssets, setPopularAssets] = React.useState([])
    const [page, setPage] = React.useState(1)

    const fetchTrendingAssets = async () => {
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=${page}&sparkline=false`
        )
        const data = await response.json()
        return data
    }

    React.useEffect(() => {
        fetchTrendingAssets().then((data) => {
            setTrendingAssets(data)
            if (data.length >= 3)
                setPopularAssets([data[0].image, data[1].image, data[2].image])
        })
    }, [page])

    const handlePageClick = (event) => {
        setPage(event.selected)
    }

    return (
        <div>
            <div className="row mt20">
                <img
                    className={style.activityIcon}
                    src="/icons/activity.svg"
                    alt="activities"
                />
                <h1 className={style.title}>Trending Assets</h1>
            </div>
            <ul className={style.assetList}>
                {trendingAssets.map((asset) => (
                    <Card
                        key={asset.id}
                        asset={asset}
                        popularPairs={popularAssets}
                    />
                ))}
            </ul>

            <div style={{display: 'flex',justifyContent: 'center'}}>
                <ReactPaginate
                    className={style.pagination}
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    pageCount={10}
                    previousLabel="<"
                />
            </div>
        </div>
    )
}
export default TredningAssets
