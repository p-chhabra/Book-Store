import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector, useDispatch} from 'react-redux';
import {useDeferredValue, useEffect} from 'react';
import { uiActions } from './store/ui-slice'
import Notification from './components/UI/Notification';
import uiSlice from './store/ui-slice';
import {Fragment} from 'react'

let isInitital = true;

function App() {
  const showCart = useSelector((state)=>{
    return state.ui.cartIsVisible;
  });

  const cart = useSelector((state) => state.cart);

  const cartitemsArray = [];

  const dispatch = useDispatch();
  const notification = useSelector((state)=>{
    return state.ui.notification;
  })

  useEffect(()=>{

    if(isInitital){
      isInitital = false;
      return;
    }

    dispatch(uiActions.showNotification({
      status: "pending",
      title: "Sending...",
      message: "Data is being sent!"
    }))

    const fetchData = async()=>{
      const response = await fetch("https://react-http-1ca3c-default-rtdb.asia-southeast1.firebasedatabase.app/books.json",{
        method: 'PUT',
        body: JSON.stringify(cart)
      })
      if(!response.ok){
        throw new Error("Something went wrong!");
      }

      dispatch(uiActions.showNotification({
        status: "success",
        title: "Data Sent...",
        message: "Data has been sent to server!"
      }))
    }
    fetchData().catch((error)=>{
      dispatch(uiActions.showNotification({
        status: 'error',
        title: "Error!",
        message: "Could not send cart data"
      }));
    });
  },[cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}></Notification>}
    <Layout>
      {showCart && <Cart itemArray={cartitemsArray}/>}
      <Products />
    </Layout>
    </Fragment>
  );
}

export default App;
