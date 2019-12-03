import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeletePainting from "./DeletePainting";
import PaintingDialogue from "./PaintingDialogue";
//Redux
import { connect } from "react-redux";

//Icons
import ChatIcon from "@material-ui/icons/Chat";
//MUI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import LikeButton from "./likeButton";
import { unlikePainting } from "../redux/actions/dataActions";

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
    console.log("paintingId in Painting" + paintingId);
    console.log("userHandle in Painting" + userHandle);
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
          <LikeButton paintingId={paintingId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <PaintingDialogue paintingId={paintingId} userHandle={userHandle} />
        </CardContent>
      </Card>
    );
  }
}

Painting.propTypes = {
  user: PropTypes.object.isRequired,
  painting: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Painting));
