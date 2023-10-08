import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import '@/styles/cards.css'

const Carrito = () => {
  const arrayProducts = []
  const anchura = (localStorage.length - 2)
  for (let index = 0; index <= anchura; index++) {
    arrayProducts.push(JSON.parse(localStorage.getItem(`Producto${index}`)))
  }
  console.log(arrayProducts)
  return (
    <>
      <h1 className='titulo text-center' style={{ margin: '2rem' }}>Carrito</h1>
      <div className='d-flex flex-row flex-wrap justify-content-center'>

        {arrayProducts.map((product) => (
          <Card className='cards' style={{ width: '23rem' }} key={product.id}>
            <Card.Img variant='top' src={product.image} alt={product.product_name} />
            <Card.Body>
              <Card.Title>{product.product_name}</Card.Title>
              <Card.Text>
                {product.description}
              </Card.Text>
            </Card.Body>
            <ListGroup className='list-group-flush'>
              <ListGroup.Item>${product.price}</ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Carrito
