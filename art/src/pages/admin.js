import React, { Component } from "react";

//MUI Stuff
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//Redux stuff
import { getPaintings } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class Admin extends Component {
  componentDidMount() {
    this.props.getPaintings();
  }

  render() {
    const { paintings } = this.props.data;
    const titles = [
      {
        label: "User"
      },
      {
        label: "Content"
      },
      { label: "Created At" }
    ];
    return (
      <TableContainer component={Paper}>
        <Table aria-label="table">
          <TableHead>
            {titles.map(title => (
              <TableRow>
                <TableCell>{title.label}</TableCell>
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {paintings.map(painting => (
              <TableRow key={painting.paintingId}>
                <TableCell component="th" scope="row">
                  {painting.userHandle}
                </TableCell>
                <TableCell>{painting.body}</TableCell>
                <TableCell>{painting.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

Admin.propTypes = {
  getPaintings: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPaintings })(Admin);
