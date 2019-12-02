import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeletePainting from "./DeletePainting";
import PaintingDialogue from "./PaintingDialogue";

import { connect } from "react-redux";
import { likePainting, unlikePainting } from "../redux/actions/dataActions";
//Icons
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//MUI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

class Painting extends Component {
  likedPainting = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        like => like.paintingId === this.props.painting.paintingId
      )
    )
      return true;
    else return false;
  };
  likePainting = () => {
    this.props.likePainting(this.props.painting.paintingId);
  };
  unlikePainting = () => {
    this.props.unlikePainting(this.props.painting.paintingId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      painting: {
        body,
        createdAt,
        userImage,
        userHandle,
        paintingId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedPainting() ? (
      <MyButton tip="Undo like" onClick={this.unlikePainting}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likePainting}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeletePainting paintingId={paintingId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={"/users/${users}"}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{body}</Typography>
          {likeButton}
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} </span>
          <PaintingDialogue paintingId={paintingId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Painting.propTypes = {
  likePainting: PropTypes.func.isRequired,
  unlikePainting: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  painting: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePainting,
  unlikePainting
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Painting));
