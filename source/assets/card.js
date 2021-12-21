import React from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  card: {
    margin: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }
};

const App = withStyles(styles)(({ classes }) => {
  return [
    <Grid container>
      <Grid item xs component={Card} className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Card A
          </Typography>
          <Typography variant="h5" component="h2">
            Short content
          </Typography>

          <Typography component="p">Not much to say</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Grid>
      <Grid item xs component={Card} className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Card B
          </Typography>
          <Typography variant="h5" component="h2">
            Medium content
          </Typography>
          <Typography component="p">
            Slightly more to say than what Card A has to say
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Grid>
      <Grid item xs component={Card} className={classes.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Card C
          </Typography>
          <Typography variant="h5" component="h2">
            Long content
          </Typography>
          <Typography component="p">
            I have quite a lot to say and as a result I am quite tall, but the
            other cards heights stretch with me
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Grid>
    </Grid>
  ];
});

ReactDOM.render(<App />, document.querySelector("#app"));
