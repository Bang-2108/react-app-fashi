import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import Product from '../Form-2/Product';

function App() {
  return (
      <div>
        <div id="preloder">
          <div className="loader" />
        </div>
        <Product></Product>
      </div>
  );
}

export default App;
