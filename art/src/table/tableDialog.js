import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

//MUI Stuff
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

//Redux stuff
import { connect } from "react-redux";

const styles = theme => ({
  ...theme.spreadThis
});

class TableDialog extends Component {
  state = { open: false };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const {
      painting: { paintingId, body, createdAt, userHandle }
    } = this.props;
    const { open } = this.state;

    const dialogMarkup = (
      <Grid container spacing={2}>
        <Grid item>
          <Typography variant="body2">{userHandle}</Typography>
          <Typography variant="body1">{body}</Typography>
          <Typography variant="body1">{createdAt}</Typography>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <Button onClick={this.handleOpen}>Details</Button>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="Detail View"
          open={open}
        >
          <DialogTitle id="detail-view">Detail View</DialogTitle>
          <DialogContent>{dialogMarkup}</DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

TableDialog.propTypes = {
  painting: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  painting: state.data.painting
});

export default connect(mapStateToProps)(withStyles(styles)(TableDialog));
