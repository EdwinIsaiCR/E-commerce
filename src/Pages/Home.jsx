import { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { getAllItemsService } from '@/services/itemServices'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import '@/styles/cards.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

export default function Home () {
  const [itemsList, setItemList] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [count, setCount] = useState(0)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    const fetchItemsData = async () => {
      try {
        const response = await getAllItemsService()
        if (response.status === 200) {
          setItemList(response.data)
          setLoading(false)
        }
      } catch (error) {
        console.log('Ocurrio un error en Home', error)
      }
    }
    fetchItemsData()
  }, [])

  

  const handlerSearch = (e) => {
    const fetchItemsData = async () => {
      const response = await getAllItemsService()
      if (response.status === 200) {
        const value = e.target.value
        setSearch(value)
        if (!value) {
          setItemList(response.data)
          setLoading(false)
        } else {
          const filterProducts = response.data.filter((product) => product.product_name.toLowerCase().includes(search.toLowerCase()))
          setItemList(filterProducts)
          console.log(itemsList)
        }
      }
    }
    fetchItemsData()
  }

  if (loading) {
    return (
      <>
        <div className='container text-center'>
          <div className='row align-items-center spinner'>
            <div className='col'>
              <Spinner animation='border' variant='danger' />
            </div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1 className='titulo text-center' style={{ margin: '2rem' }}>Productos disponibles</h1>
        <div className='container-fluid mt-5'>
          <div className='row mb-5'>
            <div className='col'>
              <div className='form__group'>
                <input type='text' className='form__input' id='name' autoComplete='off' placeholder='Buscar Producto por el nombre...' onChange={handlerSearch} />
                <label className='form__label'>Buscar Producto por el nombre...</label>
              </div>
            </div>
          </div>
        </div>
        <Tabs
          defaultActiveKey='todo'
          id='justify-tab-example'
          className='mb-3'
          justify
        >
          <Tab className='tabs' eventKey='todo' title='Ver todo'>
            <div className='d-flex flex-row flex-wrap justify-content-center'>
              {/* Si itemsData no esta vacio, recorro el arreglo con Map y creo un Card de Bootstrap para cada elemento */}
              {itemsList && itemsList.map((product) => (
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
                  <Card.Body>
                    <Button
                      onClick={() => {
                        handleShow()
                        localStorage.setItem(`Producto${count}`, JSON.stringify(product))
                        setCount((count) => count + 1)
                      }} variant='secondary'
                    >Agregar al carrito
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Tab>
          <Tab eventKey='toys' title='Toys'>
            <div className='d-flex flex-row flex-wrap justify-content-center'>
              {itemsList && itemsList.filter(product => product.category === 'Toys')
                .map((product) => (
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
                    <Card.Body>
                      <Button
                        onClick={() => {
                          handleShow()
                          localStorage.setItem(`Producto${count}`, JSON.stringify(product))
                          setCount((count) => count + 1)
                        }} variant='secondary'
                      >Agregar al carrito
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Tab>
          <Tab eventKey='games' title='Games'>
            <div className='d-flex flex-row flex-wrap justify-content-center'>
              {itemsList && itemsList.filter(product => product.category === 'Grocery')
                .map((product) => (
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
                    <Card.Body>
                      <Button
                        onClick={() => {
                          handleShow()
                          localStorage.setItem(`Producto${count}`, JSON.stringify(product))
                          setCount((count) => count + 1)
                        }} variant='secondary'
                      >Agregar al carrito
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Tab>
          <Tab eventKey='salud' title='Salud'>
            <div className='d-flex flex-row flex-wrap justify-content-center'>
              {itemsList && itemsList.filter(product => product.category === 'Health')
                .map((product) => (
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
                    <Card.Body>
                      <Button
                        onClick={() => {
                          handleShow()
                          localStorage.setItem(`Producto${count}`, JSON.stringify(product))
                          setCount((count) => count + 1)
                        }} variant='secondary'
                      >Agregar al carrito
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>
          </Tab>
        </Tabs>
        <div className='margin' />

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Producto agregado al carrito</Modal.Title>
          </Modal.Header>
          {/* <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body> */}
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Nav.Link href='/Carrito'>Carrito</Nav.Link>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
