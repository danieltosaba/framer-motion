import { Grid } from '@material-ui/core';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Blanket } from '../models/blanket';

export interface HomeProps {
  blankets: Blanket[];
}

export default function Home({blankets}: HomeProps) {
  return <div>
    <Head>
      <title>Framer Motion Transitions</title>
    </Head>
    <main>
      <Grid container>
        {blankets.map(blanket => (
        <Grid key={blanket.id} item xs={12} sm={6} lg={4}>
          <img src={blanket.imageUrl.cover} alt={blanket.name}/>
        </Grid>
        ))}
      </Grid>
    </main>
   
    </div>
}

export const getStaticProps: GetStaticProps = async ctx =>  {
  const response = await fetch("https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/");
  const blankets = await response.json();
  console.log("blankets", blankets);
  return {
    props: {blankets}
  }
}