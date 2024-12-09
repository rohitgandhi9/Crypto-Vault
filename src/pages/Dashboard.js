import React, { useState, useEffect } from 'react'
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';

function DashboardPage() {

  const [coins, setcoins] = useState([])
  const [paginatedCoins, setpaginatedCoins] = useState("")
  const [search, setsearch] = useState("")
  const [page, setPage] = useState(1);
  const [isLoading, setisLoading] = useState(true)
  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setpaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };
  const onSearchChange = (e) => {
    setsearch(e.target.value)
  }
  var filteredCoins = coins.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.symbol.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    // fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1').then((res)=>res.json())
    // .then((data)=>{});
    getData();
  }, [])
  const getData = async () => {
    const myData = await get100Coins();
    if (myData) {
      setcoins(myData)
      setpaginatedCoins(myData.slice(0, 10))
      setisLoading(false)
    }

  }

  return (
    <>
      <Header />
      <BackToTop />
      {
        isLoading ? (<Loader />)
          : (<div>
            <Search search={search} onSearchChange={onSearchChange} />
            <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
            {!search && (
              <PaginationComponent page={page} handleChange={handlePageChange} />
            )}
            {/* <PaginationComponent page={page} handleChange={handlePageChange} /> */}
          </div>)}
    </>
  )
}

export default DashboardPage;
