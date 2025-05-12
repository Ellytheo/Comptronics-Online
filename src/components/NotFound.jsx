import { useNavigate } from 'react-router-dom';
import pic2 from '../images/pic2.avif'

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div >
      <center><h1>Page not found</h1></center>
      <center><button className='button' onClick={()=>{navigate('/getproduct')}}>Home</button></center>
      <img src={pic2} alt=""  width='100%'/>
      
    </div>
  );
}

export default NotFound;
