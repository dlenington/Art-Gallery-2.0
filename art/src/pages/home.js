import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import Profile from "../components/profile/Profile";
import PropTypes from "prop-types";
import Painting from "../components/painting/Painting";
import PaintingSkeleton from "../util/PaintingSkeleton";

//Redux imports
import { getPaintings } from "../redux/actions/dataActions";
import { connect } from "react-redux";

class Home extends Component {
  componentDidMount() {
    this.props.getPaintings();
  }
  render() {
    const { paintings, loading } = this.props.data;
    console.log(paintings);
    let recentPaintingsMarkup = !loading ? (
      paintings.map(painting => (
        <Painting key={painting.paintingId} painting={painting} />
      ))
    ) : (
      <PaintingSkeleton />
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {recentPaintingsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile></Profile>
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPaintings: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPaintings })(Home);
