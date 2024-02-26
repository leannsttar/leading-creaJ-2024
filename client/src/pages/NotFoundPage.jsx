
import { Link } from 'react-router-dom'
import { MobileNavBar } from '../components/MobileNavBar.jsx'

export const NotFoundPage = () => {

  return (
    <>
      <MobileNavBar />
      <div className='flex flex-col gap-2'>
        404 Not Found
        <Link to={'/'}>Home</Link>
      </div>
    </>
  )
}