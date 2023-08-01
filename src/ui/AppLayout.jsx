import Header from './Header'
import CartOverview from '../features/cart/CartOverview'
import Loader from './Loader';
import { Outlet, useNavigation } from 'react-router'
export default function AppLayout() {

  const navigation = useNavigation();
  // console.log(navigation);
  const isLoading = navigation.state==='loading'
  return ( <div className='grid h-screen grid-rows-[auto_1fr_auto] '>
         {isLoading&&<Loader/>}

          <Header></Header>
        <div  className='overflow-scroll'>
      <main className='overflow-scroll max-w-3xl  mx-auto '>
        <Outlet></Outlet>
      </main>
    </div> 
          <CartOverview></CartOverview>
    </div>)
}

