import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { useEffect, useState } from 'react';

const Products = (props) => {

  const [books, setBooks] = useState([]);

  useEffect(()=>{
    const fetchBookList = async()=>{
      const response = await fetch('https://react-http-1ca3c-default-rtdb.asia-southeast1.firebasedatabase.app/BookList.json');
      if(!response.ok){
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const bookList = [];

      for(const key in data){
        bookList.push({
          title: data[key].title,
          id: data[key].id,
          description: data[key].description,
          price: data[key].price
        })
      }
      setBooks(bookList);
    }

    fetchBookList().catch((error)=>{
      console.log(error.message);
    })
  },[books])

  const productItems = books.map((product)=>{
    return <li><ProductItem key={product.id} title={product.title} price={product.price} description={product.description} id={product.id}></ProductItem></li>
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
