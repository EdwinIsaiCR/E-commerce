import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'
import '@/styles/carrito.css'

const Carrito = () => {
  const arrayProducts = []
  const anchura = (localStorage.length - 1)
  for (let index = 0; index < anchura; index++) {
    arrayProducts.push(JSON.parse(localStorage.getItem(`Producto${index}`)))
  }
  console.log(arrayProducts)
  return (
    <div>
      <h1 className='titulo text-center' style={{ margin: '2rem' }}>Carrito</h1>
      <div className='d-flex flex-row flex-wrap justify-content-center'>

        {arrayProducts.map((product) => (

        <div className='wrapper' key={product.id}>
            <div className="product-img">
          <img src={product.image} alt={product.product_name} height="420" width="327"/>
          </div>
          <div className="product-info">
            <div clclassNameass="product-text">
              <h1>{product.product_name}</h1>
            </div>
            <div className="product-price-btn">
              <p><span>78</span>$</p>
              <select aria-label="Cantidad">
                    <option value="1">1</option><option value="2">2</option>
                    <option value="3">3</option><option value="4">4</option>
                    <option value="5">5</option><option value="6">6</option>
                    <option value="7">7</option><option value="8">8</option>
                    <option value="9">9</option><option value="10">10</option>
                    <option value="11">11</option><option value="12">12</option>
                    <option value="13">13</option><option value="14">14</option>
                    <option value="15">15</option><option value="16">16</option>
                    <option value="17">17</option><option value="18">18</option>
                    <option value="19">19</option><option value="20">20</option>
              </select>
            <button type="button"><BsFacebook /></button>
            </div>
          </div>
        </div>

        ))}
      </div>
  </div>
  )
}

export default Carrito
