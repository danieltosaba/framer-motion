import { Container, Grid } from "@material-ui/core";
import fetch from "isomorphic-unfetch";
import { GetStaticPaths, GetStaticProps } from "next";
import ImageGallery from "react-image-gallery";
import { Blanket } from "../../models/blanket";
import "../../node_modules/react-image-gallery/styles/css/image-gallery.css";


type ProductDetailsProps = Blanket;

export default function ProductDetails({
  name,
  imageUrl,
  description,
  price,
  size,
}: ProductDetailsProps) {

  let images = [];
  imageUrl.url.forEach((img) => {
    images.push({
      original: img,
      thumbnail: img,
    });
  });

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <ImageGallery items={images} />
          <pre>{JSON.stringify(imageUrl, null, 4)}</pre>
        </Grid>
        <Grid item xs={12} sm={6}></Grid>
      </Grid>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params.id;
  const response = await fetch(
    `https://my-json-server.typicode.com/danieltosaba/framer-motion/blankets/${id}`
  );
  const blanket = await response.json();
  console.log(blanket);
  return {
    props: blanket,
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
