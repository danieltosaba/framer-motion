import { Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Blanket } from "../models/blanket";

export interface HomeProps {
  blankets: Blanket[];
}

const useStyles = makeStyles({
  image: {
    width: "100%",
  },
});

const easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};
const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home({ blankets }: HomeProps) {
  const classes = useStyles();
  return (
    <motion.div exit={{ opacity: 0 }} initial="initial" animate="animate">
      <div>
        <Head>
          <title>Framer Motion Transitions</title>
        </Head>
        <main>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h1>CHOOSE YOUR BLANKET</h1>
            </Grid>
              <Grid container component={motion.div} variants={stagger} spacing={2}>
              {blankets.map((blanket) => (
                <Grid key={blanket.id} item xs={12} sm={6} lg={4}>
                  <motion.div variants={fadeInUp}>
                    <Card>
                      <Link href="/product/[id]" as={`/product/${blanket.id}`}>
                        <a>
                          <motion.img 
                          initial={{x:60, opacity:0}} animate={{x:0, opacity:1}} transition={{delay:.3}}
                            src={blanket.imageUrl.cover}
                            alt={blanket.name}
                            className={classes.image}
                          />
                        </a>
                      </Link>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
              </Grid>
          </Grid>
        </main>
      </div>
    </motion.div>
  );
}

// export const getStaticProps: GetStaticProps = async (ctx) => {
//   const response = await fetch("http://localhost:4001/blankets/");
//   const blankets = await response.json();
//   return {
//     props: { blankets },
//   };
// };

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:4001/blankets/");
  const blankets = await response.json();

  return {
    props: { blankets },
  };
};
