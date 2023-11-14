import React, { useState, useEffect } from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const Producto = ({ id }) => {
  const [product, setProduct] = useState([{}]); // Cambiado a una matriz con un objeto como estado inicial
  const [loading, setLoading] = useState(true);

  const buscarProductoId = async () => {
    console.log('Inicio de API dentro del método');
    try {
      const response = await fetch(`http://localhost/api/item/${id}`);
      if (!response.ok) {
        throw new Error('Error al obtener el producto');
      }
      const result = await response.json();
      console.log('Product Inicial', result);
      setProduct(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Indicar que la carga ha finalizado, ya sea con éxito o con error.
    }
  };

  useEffect(() => {
    buscarProductoId();
  }, [id]);

  return (
    <div>
      {loading ? (
        <p>Cargando producto...</p>
      ) : (
        <>
          <i style={{ fontSize: '4em' }} className="uil uil-shopping-bag"></i>
          <div className='productos'>
          <div className="card" key={product[0].id}>
              {product[0].images.map((image, index) => (
                <img
                  key={index}
                  className='imgItem card-img-top'
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  onLoad={() => console.log(`Imagen ${index + 1} cargada`)}
                  onError={() => console.error(`Error al cargar la imagen ${index + 1}`)}
                />
              ))}
              <div className="card-body">
                <h4 className="card-title">{product[0].title}</h4>
                <h5>{product[0].category}</h5>
                <p className="card-text">{product[0].description}</p>
                <div className='row'>
                  <div className='col-6'>
                    <p><b>${product[0].price}</b></p>
                  </div>
                  <div className='col-6'>
                    <div className='rating'>
                      {[...Array(Math.floor(product[0].rating))].map((star, index) => (
                        <FaStar key={index} color='#ffc107' />
                      ))}
                      {product[0].rating % 1 !== 0 && <FaStarHalfAlt color='#ffc107' />}
                    </div>
                  </div>
                  <button className='btn btn-dark'>Comprar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Producto;
