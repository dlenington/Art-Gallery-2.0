import React, { Component } from "react";
import MyButton from "../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

//Redux
import { connect } from "react-redux";
import { likePainting, unlikePainting } from "../redux/actions/dataActions";
class LikeButton extends Component {
  state = {};
  likedPainting = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.paintingId === this.props.paintingId
      )
    )
      return true;
    else return false;
  };

  likePainting = () => {
    this.props.likePainting(this.props.paintingId);
  };
  unlikePainting = () => {
    this.props.unlikePainting(this.props.paintingId);
  };
  render() {
    const { authenticated } = this.props.user;
    const likeButton = !authenticated ? (
      <Link to="/login">
        <MyButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyButton>
      </Link>
    ) : this.likedPainting() ? (
      <MyButton tip="Undo like" onClick={this.unlikePainting}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likePainting}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
    return likeButton;
  }
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  paintingId: PropTypes.string.isRequired,
  likePainting: PropTypes.func.isRequired,
  unlikePainting: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePainting,
  unlikePainting
};
export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
