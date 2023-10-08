import { useState, useEffect } from 'react'
import { getMeUserService } from '@/services/userServices'
import '@/styles/dashboard.css'
import { BsFacebook, BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs'

const Dashboard = () => {
  const [userData, setUserData] = useState({})
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMeUserService(token)
        if (response.status === 200) {
          setUserData(response.data)
        }
      } catch (error) {
        console.log('Ocurrio un error en Dashboard', error)
      }
    }
    fetchUserData()
  }, [])
  return (
    <>
      <div className='container3'>
        <h1 className='titulo text-center'>Informacion del usuario</h1>
        <div className='card'>
          <img src='https://es.web.img3.acsta.net/r_1280_720/newsv7/22/05/09/09/12/3054315.jpg' alt='Person' className='card__image' />
          {
            userData?.first_name && <p className='card__name'>{userData.first_name}</p>
          }
          {
            userData?.last_name && <p className='card__name'>{userData.last_name}</p>
          }
          <div className='grid-container'>
            {
              userData?.first_name && <div className='grid-child-posts'><p>Genero:</p> {userData.gender === 'M' ? <p>Masculino</p> : <p>Femenino</p>} </div>
            }

            <div className='grid-child-followers'>
              <p>Email:</p>
              {
              userData?.first_name && <p>{userData.email}</p>
            }
            </div>

          </div>
          <ul className='social-icons'>
            <li><a href='#'><i className='fa fa-instagram'><BsFacebook /></i></a></li>
            <li><a href='#'><i className='fa fa-twitter'><BsTwitter /></i></a></li>
            <li><a href='#'><i className='fa fa-linkedin'><BsLinkedin /></i></a></li>
            <li><a href='#'><i className='fa fa-codepen'><BsGithub /></i></a></li>
          </ul>

        </div>
      </div>
      <div className='margin' />
    </>
  )
}

export default Dashboard
