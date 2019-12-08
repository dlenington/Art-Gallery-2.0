import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Painting from "../components/painting/Painting";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import PaintingSkeleton from "../util/PaintingSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    paintingIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    const paintingId = this.props.match.params.paintingId;

    if (paintingId) this.setState({ paintingIdParam: paintingId });
    this.props.getUserData(handle);
    axios.get(`/user/${handle}`).then(res => {
      this.setState({
        profile: res.data.user
      });
    });
  }

  render() {
    const { paintings, loading } = this.props.data;
    const { paintingIdParam } = this.state;

    const paintingsMarkup = loading ? (
      <PaintingSkeleton />
    ) : paintings === null ? (
      <p>No paintings from this user</p>
    ) : !paintingIdParam ? (
      paintings.map(painting => (
        <Painting key={painting.paintingId} painting={painting} />
      ))
    ) : (
      paintings.map(painting => {
        if (painting.paintingId !== paintingIdParam)
          return <Painting key={painting.paintingId} painting={painting} />;
        else
          return (
            <Painting
              key={painting.paintingId}
              painting={painting}
              openDialog
            />
          );
      })
    );
    return (
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          {paintingsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}
user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
