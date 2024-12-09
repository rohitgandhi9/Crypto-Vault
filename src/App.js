import './App.css';
import {BrowserRouter,Route,Routes} from "react-router-dom"
import HomePage from './pages/Home';
import CoinPage from './pages/Coin';
import DashboardPage from './pages/Dashboard';
import ComparePage from './pages/ComparePage';
import WatchlistPage from './pages/Watchlist';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>}></Route>
          <Route path="/dashboard" element={<DashboardPage/>}></Route>
          <Route path="/coin/:id" element={<CoinPage/>}></Route>
          <Route path="/compare" element={<ComparePage/>}></Route>
          <Route path="/watchlist" element={<WatchlistPage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
