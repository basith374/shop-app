import React from 'react';
import { useHistory } from 'react-router-dom';
import Image from './Image';

function CategoryCard(props) {
  const history = useHistory();
  const openProduct = () => {
    history.push('/product')
  }
  return <div className="cat-c" onClick={openProduct}>
    <div className="cc-h">
      <Image src={'https://res.cloudinary.com/bluroe-labs/image/upload/shop-images/' + props.category.file} alt="product" />
    </div>
    <div className="cc-b">{props.category.name}</div>
  </div>
}

function CategorySlide(props) {
  return <div className="cat">
    <div className="cat-t">{props.category.name}</div>
    <div className="cat-bc">
      <div className="cat-b">
        {props.category.items.map(c => <CategoryCard category={c} />)}
      </div>
    </div>
  </div>
}

function Banner() {
  const history = useHistory();
  const showCategory = () => {
    history.push('/category');
  }
  return <div className="b-p" onClick={showCategory}>
    <Image src="https://picsum.photos/300/200" alt="banner" />
  </div>
}

function Home() {
  let cats = [
    {
      name: 'Snacks',
      items: [
        {name: 'Pizza', file: 'pizza.jpg'},
        {name: 'Burger', file: 'burger.jpg'},
        {name: 'Shawarma', file: 'shawarma.jpeg'},
      ]
    },
    {
      name: 'Desserts',
      items: [
        {name: 'Unnakaya', file: 'unnakaya.jpg'},
        {name: 'Halwa', file: 'Gajar-Ka-Halwa.jpg'},
      ]
    },
    {
      name: 'Cakes',
      items: [
        {name: 'Chocolate', file: 'butter-scotch.jpg'},
        {name: 'Butterscotch', file: 'butter-scotch2.jpg'},
        {name: 'Almond', file: 'almond-cake.jpg'},
        {name: 'Red Velvet', file: 'red-velvet.jpg'},
      ]
    },
    {
      name: 'Cooking',
      items: [
        {name: 'Sugar', file: 'sugar.jpg'},
        {name: 'Pepper', file: 'black-pepper.png'},
        {name: 'Atta', file: 'atta.jpeg'},
        {name: 'Spices', file: 'eastern-sambar.png'},
      ]
    },
    {
      name: 'Home Essentials',
      items: [
        {name: 'Toothpaste', file: 'colgate.jpg'},
        {name: 'Detergents', file: 'tide.jpg'},
        {name: 'Soap', file: 'lifebuoy.jpg'},
      ]
    },
    {
      name: 'Vegetables',
      items: [
        {name: 'Potatoes', file: 'potatoes.jpg'},
        {name: 'Gourds', file: 'gourd.jpg'},
        {name: 'Tomatoes', file: 'tomato.jpg'},
        {name: 'Garlic', file: 'garlic.jpg'},
      ]
    },
    {
      name: 'Fruits',
      items: [
        {name: 'Apples', file: 'apples.jpg'},
        {name: 'Oranges', file: 'orange.jpg'},
        {name: 'Watermelon', file: 'watermelon.jpg'},
      ]
    },
  ]
  return (
    <div className="c-c">
      <div className="a-h">
        <div className="a-c">
          <div>Delivery from 9:00 to 7:00</div>
          <div>Anywhere in Thalassery</div>
        </div>
      </div>
      <div className="b-h">
        <div className="b-c">
          <Banner />
          <Banner />
          <Banner />
        </div>
      </div>
      <div className="cats">
        {cats.map(c => <CategorySlide key={c.name} category={c} />)}
      </div>
    </div>
  )
}

export default Home;
