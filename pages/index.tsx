import { Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { motion } from "framer-motion";
import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { Blanket } from "../models/blanket";

export interface HomeProps {
  blankets: Blanket[];
}

const useStyles = makeStyles({
  image: {
    width: "100%",
  },
});

export default function Home({ blankets }: HomeProps) {
  const classes = useStyles();
  const {data} = useSWR('https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/', (url: string) => axios(url).then(r => r.data), {initialData: blankets})
  return (
    <motion.div exit={{ opacity: 0 }} initial={{opacity: 0}} animate={{opacity: 1}}>
      <div>
        <Head>
          <title>Framer Motion Transitions</title>
        </Head>
        <main>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <h1>CHOOSE YOUR BLANKET</h1>
              </Grid>
              {data.map((blanket) => (
                <Grid key={blanket.id} item xs={12} sm={6} lg={4}>
                  <Card>
                    <Link href="/product/[id]" as={`/product/${blanket.id}`}>
                      <a>
                        <img
                          src={blanket.imageUrl.cover}
                          alt={blanket.name}
                          className={classes.image}
                        />
                      </a>
                    </Link>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </main>
      </div>
    </motion.div>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const response = await fetch(
    "https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/"
  );
  const blankets = await response.json();
  return {
    props: { blankets },
  };
};
