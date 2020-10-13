import { Card, Grid, Paper, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";
import { GetStaticPaths, GetStaticProps } from "next";
import ImageGallery from "react-image-gallery";
import { Blanket } from "../../models/blanket";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";

type ProductDetailsProps = Blanket;

export default function ProductDetails({ name, description, imageUrl, size, price }: ProductDetailsProps) {

  let images = [];
  imageUrl.url.forEach((img) => {
    images.push({
      original: img,
      thumbnail: img,
    });
  });

  return (
    <motion.div
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ImageGallery items={images} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Price: {price.small}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {description}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
    </motion.div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `http://localhost:4001/blankets/${id}`
  );
  const blanket = await response.json();

  return {
    props: blanket,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "http://localhost:4001/blankets/"
  );
  const blankets: Blanket[] = await response.json();
  const paths = blankets.map((blanket) => {
    return { params: { id: blanket.id.toString() } };
  });

  return {
    paths,
    fallback: false,
  };
};
