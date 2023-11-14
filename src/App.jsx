
import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route,  useNavigate, useParams } from 'react-router-dom';
import Lista from './components/listaProducto';
import Producto from './components/producto';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:search" element={<SearchPage />} />
        <Route path="/item/:id" element={<SelectedProduct/>} />
      </Routes>
    </Router>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = document.getElementById('txtFiltro').value.toString();
    navigate(`/search/${search}`);
  };

  return (
    <div>
      <i style={{ fontSize: '6em' }} className="uil uil-shopping-bag"></i>
      <h1>Bazar Online</h1>
      <div className="card">
        <input type="text" id='txtFiltro' name='search' className='form-control' />
        <button onClick={handleSearch}>
         Buscar <i className="uil uil-search"></i>
        </button>
      </div>
    </div>
  );
};

const SelectedProduct = () => {
  const { id } = useParams();
  console.log('Inicio de API', id);
  return (
    <div>
      <Producto id={id}  /> 
    </div>
  );
};


const SearchPage = () => {
  const [items, setItems] = useState([]);
  const { search } = useParams();
  const navigate = useNavigate();

  const buscarProducto = async () => {
    try {
      const response = await fetch(`http://localhost/api/items/${search}`);
      const results = await response.json();
      setItems(results);
      

    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    buscarProducto();
  }, [search]);  // Este efecto se ejecutará cuando search cambie

  return (
    <div>
      <button onClick={() => navigate('/')}>Volver</button>
      <Lista items={items} search={search} contador={items.length} />  {/* Pasa los datos al componente ProductList */}
    </div>
  );
};



export default App;
