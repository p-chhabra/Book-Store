import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';

const Cart = (props) => {

  const cartItemsArray = useSelector(state => state.cart.items);
  const cartItems = cartItemsArray.map((item)=>{
    return(<CartItem key={item.id} item={{id:item.id, title: item.name,quantity: item.quantity, price: item.price, total: item.totalPrice}}></CartItem>)
  })

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems}
      </ul>
    </Card>
  );
};

export default Cart;
