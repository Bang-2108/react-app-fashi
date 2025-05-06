import logo from './logo.svg';
import './App.css';
import Header from '../Header/Header';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import Product from '../Form-2/Fashion';
import Room from '../Form-3/Room';
import Food from '../Form-1/Food';
import Fashion from '../Form-2/Fashion';

function App() {
  return (
      <div>
        <div id="preloder">
          <div className="loader" />
        </div>
        <Fashion></Fashion>
        {/* <Room></Room> */}
        {/* <Food></Food> */}

      </div>
  );
}

export default App;
