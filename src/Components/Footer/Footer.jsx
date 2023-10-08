import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'
import './Footer.css'

export default function Footer () {
  return (
    <>
      <footer className='footer-distributed'>

        <div className='footer-left'>
          <img
            src='https://www.creativefabrica.com/wp-content/uploads/2020/02/10/Shop-Logo-Graphics-1-580x386.jpg'
            width='70'
            height='auto'
            alt='logo'
          />
          <p>Creado por: Edwin Isai Cruz Ramirez</p>
        </div>
        <div className='footer-right'>

          <a href='#'><i className='fa fa-facebook'><BsFacebook /></i></a>
          <a href='#'><i className='fa fa-twitter'><BsTwitter /></i></a>
          <a href='#'><i className='fa fa-linkedin'><BsLinkedin /></i></a>
          <a href='#'><i className='fa fa-github'><BsGithub /></i></a>

        </div>
      </footer>
    </>
  )
}
