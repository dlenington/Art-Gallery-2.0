import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Profile from "../components/Profile";
import PropTypes from "prop-types";
import Painting from "../components/Painting.jsx";

//Redux imports
import { getPaintings } from "../redux/actions/dataActions";
import { connect } from "react-redux";

class home extends Component {
  componentDidMount() {
    this.props.getPaintings();
  }
  render() {
    const { paintings, loading } = this.props.data;
    let recentPaintingsMarkup = !loading ? (
      paintings.map(painting => (
        <Painting key={painting.paintingId} painting={painting} />
      ))
    ) : (
      <p>Loading...</p>
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

export default connect(mapStateToProps, { getPaintings })(home);
