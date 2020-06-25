import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import Image from './Image';
import { gql } from 'apollo-boost';
import Error from './Error';
import Loading from './Loading';

const followLink = (history, content) => {
  const { link } = content;
  const { type } = link;
  if (type === 'search') history.push('/search/' + link.word);
  if (type === 'category') history.push('/category/' + link.id);
  if (type === 'product') history.push('/product/' + link.id);
}

function BannerImage(props) {
  const history = useHistory();
  const { content } = props;
  return <div className="b-p" onClick={() => followLink(history, content)}>
    <Image src={content.image} alt={content.name} />
  </div>
}

function Banner(props) {
  return <div className="b-c">
    <BannerImage content={props.content} />
  </div>
}

function Text(props) {
  const { background, color } = props.content;
  return <div className="a-h">
    <div className="a-c" style={{ background, color }}>
      {props.content.text.split('\n').map((t, i) => <div key={i}>{t}</div>)}
    </div>
  </div>
}

function BannerSlide(props) {
  return <div className="b-h">
    <div className="b-c">
      {props.content.items.map((c, i) => <BannerImage key={i} content={c} />)}
    </div>
  </div>
}

function Card(props) {
  const history = useHistory();
  const { content } = props
  return <div className="cat-c" onClick={() => followLink(history, content)}>
    <div className="cc-h">
      <Image src={content.image} alt={content.name} />
    </div>
    <div className="cc-b">{content.name}</div>
  </div>
}

function CardSlide(props) {
  return <div className="cat">
    <div className="cat-t">{props.content.name}</div>
    <div className="cat-bc">
      <div className="cat-b">
        {props.content.items.map((c, i) => <Card content={c} key={i} />)}
      </div>
    </div>
  </div>
}

function Home() {
  const { error, loading, data } = useQuery(gql`
    query {
      setting(key: "Homepage")
    }
  `)
  const [schema, setSchema] = useState([]);
  const renderSchema = (s, i) => {
    const props = { content: s, key: i }
    if (s.type === 'text') return <Text {...props} />
    if (s.type === 'banner') return <Banner {...props} />
    if (s.type === 'bannerslide') return <BannerSlide {...props} />
    if (s.type === 'cardslide') return <CardSlide {...props} />
    return null;
  }
  useEffect(() => {
    if (data && data.setting) {
      try {
        setSchema(JSON.parse(data.setting))
      } catch (err) { }
    }
  }, [data]);
  if(error) return <Error msg="Something went wrong" />
  if(loading) return <Loading />
  return (
    <div className="c-c">
      {schema.map(renderSchema)}
    </div>
  )
}

export default Home;
