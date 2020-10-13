import { Card, Container, Grid, Paper, Typography } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import axios from "axios";
import { motion } from "framer-motion";
import fetch from "isomorphic-unfetch";
import { GetStaticPaths, GetStaticProps } from "next";
import ImageGallery from "react-image-gallery";
import useSWR from "swr";
import { Blanket } from "../../models/blanket";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";

// type ProductDetailsProps = Blanket;
interface ProductDetailsProps extends Blanket {
  blanketID: string;
}

export default function ProductDetails({ blanket, blanketID }) {
  const {
    data,
  } = useSWR(
    `https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/${blanketID}`,
    (url: string) => axios(url).then((r) => r.data),
    { initialData: blanket }
  );

  let images = [];
  data.imageUrl.url.forEach((img) => {
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
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <ImageGallery items={images} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <Card>
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    {data.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Price: {data.price.small}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {data.description}
                  </Typography>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </motion.div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/${id}`
  );
  const blanket = await response.json();

  return {
    props: { blanket, blanketID: id },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch(
    "https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/"
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
