import { Button, Drawer, Grid, List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ArrowBack } from "@material-ui/icons";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  back: {
    textAlign: 'right'
  }
});

export default function Nav() {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <Button onClick={() => setVisible(!visible)}>
            <MenuIcon />
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.back}>
          {router.pathname !== '/' ? (<Button onClick={() => router.back()}><ArrowBack /></Button>) : null}
        </Grid>
      </Grid>
      <Drawer anchor="left" open={visible} onClose={() => setVisible(false)}>
        <List className={classes.list}>
          <ListItem>
            <Link href="daniel">DANIEL</Link>
          </ListItem>
          <ListItem>
            <Link href="daniel">DANIEL</Link>
          </ListItem>
          <ListItem>
            <Link href="daniel">DANIEL</Link>
          </ListItem>
          <ListItem>
            <Link href="daniel">DANIEL</Link>
          </ListItem>
        </List>
      </Drawer>{" "}
    </div>
  );
}
