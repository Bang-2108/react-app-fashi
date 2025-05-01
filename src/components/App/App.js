import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import Product from '../Form-2/Product';
import Room from '../Form-3/Room';
import Food from '../Form-1/Food';

function App() {
  return (
      <div>
        <div id="preloder">
          <div className="loader" />
        </div>
        <Product></Product>
        {/* <Room></Room> */}
        {/* <Food></Food> */}

      </div>
  );
}

export default App;
