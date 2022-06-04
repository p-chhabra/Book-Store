import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {

  const DUMMY_PRODUCTS = [{
    title: 'My Book', price: 25, id: 'b1', description: 'First book I ever wrote'
  },{
    title: 'Houdini', price: 15,id:'b2', description: 'The famous Magician Houdini'
  }]

  const productItems = DUMMY_PRODUCTS.map((product)=>{
    return <li><ProductItem title={product.title} price={product.price} description={product.description} id={product.id}></ProductItem></li>
  })

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {productItems}
      </ul>
    </section>
  );
};

export default Products;
