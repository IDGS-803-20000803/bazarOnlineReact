
import { useNavigate } from 'react-router-dom';
import './lista.css' 
import { FaStar,FaStarHalfAlt  } from 'react-icons/fa'; 


const listaProducto = ({ items , search, contador}) => {
  console.log('lista :'+items);
  const navigate = useNavigate();

  const handleSearch = () => {
    const search = document.getElementById('txtFiltro').value.toString();
    navigate(`/search/${search}`);
  };
  return (
    <>
    <i style={{ fontSize: '4em' }} className="uil uil-shopping-bag"></i>
      <div className="input-group mb-3">
        <button className="btn btn-outline-secondary" onClick={handleSearch} type="button" id="button-addon1"><i className="uil uil-search"></i></button>
        <input type="text" id='txtFiltro' className="form-control" placeholder="buscar....."  />
      </div>
      <h6>Resultado de la busqueda {search} : {contador} </h6>
      <div className='productos'>
        {items.map((item)=> {
          return(
            <div className="card" key={item.id}>
             <img className='imgItem card-img-top' src={item.images[0]} alt="" />
              <div className="card-body">
                <div className='row'>
                  <div className='col-6'>
                    <h4 className="card-title">{item.title}</h4>
                  </div>
                  <div className='col-6'>
                    <h5>{item.category}</h5>
                  </div>
                </div>
                <p className="card-text">
                  {item.description}
                </p>
                <div className='row'>
                  <div className='col-6'>
                     <p><b>${item.price}</b></p>
                  </div>
                  <div className='col-6'>
                    <div className='rating'>
                      {[...Array(Math.floor(item.rating))].map((star, index) => {
                        return <FaStar key={index} color='#ffc107' />;
                      })}
                      {item.rating % 1 !== 0 && <FaStarHalfAlt color='#ffc107' />}
                    </div>
                  </div>
                </div>
                
                <button className='btn btn-dark' onClick={() => navigate(`/item/${item.id}`)}>
                Ver Producto
              </button>
              </div>
            </div>
           
              
          
          );
        })}
      </div>
    </>
  )
}

export default listaProducto