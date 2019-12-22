import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import TableDialog from "../table/tableDialog";

// import _ from "lodash";

//MUI Stuff
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination, ListItemText } from "@material-ui/core";

//Redux stuff
import { getPaintings } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { ListItem } from "material-ui";

const styles = theme => ({
  ...theme.spreadThis
});

class Admin extends Component {
  state = {
    page: 0,
    newPage: 0,
    rowsPerPage: 5,
    dense: false,
    order: "asc",
    orderBy: "userHandle",
    open: false
  };
  componentDidMount() {
    this.props.getPaintings();
  }

  desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  stableSort = (array, cmp) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  getSorting = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => this.desc(a, b, orderBy)
      : (a, b) => -this.desc(a, b, orderBy);
  };

  render() {
    const { paintings } = this.props.data;
    const { page, rowsPerPage, dense, orderBy, order, open } = this.state;
    const emptyRows =
      rowsPerPage -
      Math.min(rowsPerPage, paintings.length - page * rowsPerPage);

    //Table Methods
    const handleChangePage = (event, newPage) => {
      console.log("newPage" + newPage);
      this.setState({ page: newPage });
    };

    const handleChangeRowsPerPage = event => {
      console.log("handleChangeRows" + parseInt(event.target.value, 10));
      this.setState({ rowsPerPage: parseInt(event.target.value, 10) });

      this.setState({ page: 0 });
    };

    //Dialog Methods

    const handleClickOpen = () => {
      this.setState({ open: true });
    };

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
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="table">
            <TableHead>
              <TableRow>
                {titles.map(title => (
                  <TableCell>{title.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {/* {paintings.map(painting => (
                <TableRow key={painting.paintingId}>
                  <TableCell component="th" scope="row">
                    {painting.userHandle}
                  </TableCell>
                  <TableCell>{painting.body}</TableCell>
                  <TableCell>{painting.createdAt}</TableCell>
                </TableRow>
              ))} */}

              {this.stableSort(paintings, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((painting, index) => {
                  return (
                    <TableRow key={painting.paintingId}>
                      <TableCell
                        id={painting.paintingId}
                        component="th"
                        scope="row"
                      >
                        {painting.userHandle}
                      </TableCell>
                      <TableCell>{painting.body}</TableCell>
                      <TableCell>{painting.createdAt}</TableCell>
                      <TableCell>
                        <TableDialog
                          open={open}
                          onClose={this.handleClose}
                          painting={painting}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={paintings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </div>
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

export default withStyles(styles)(
  connect(mapStateToProps, { getPaintings })(Admin)
);
