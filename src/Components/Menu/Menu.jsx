import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const Menu = () => {
  return (
    <div className='container'>
      <Tabs
        defaultActiveKey='profile'
        id='uncontrolled-tab-example'
        className='mb-3'
      >
        <Tab eventKey='todo' title='Ver todo'>
          Tab content for Home
        </Tab>
        <Tab eventKey='home' title='Home'>
          Tab content for Profile
        </Tab>
        <Tab eventKey='games' title='Games'>
          Tab content for Contact
        </Tab>
      </Tabs>
    </div>
  )
}

export default Menu
