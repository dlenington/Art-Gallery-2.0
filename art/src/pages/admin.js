import React, { Component } from "react";
import _ from "lodash";

//MUI Stuff
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination } from "@material-ui/core";

//Redux stuff
import { getPaintings } from "../redux/actions/dataActions";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

class Admin extends Component {
  state = {
    page: 0,
    newPage: 0,
    rowsPerPage: 0
  };
  componentDidMount() {
    this.props.getPaintings();
  }

  //   handlePageChange = page => {
  //     this.setState({ currentPage: page });
  //   };

  render() {
    const { paintings } = this.props.data;
    console.log(paintings);
    const page = this.state.page;
    const rowsPerPage = this.state.rowsPerPage;
    console.log("page" + page);
    const pageSize = 2;
    const itemsCount = paintings.length;
    console.log(paintings.length);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    const pages = _.range(1, pagesCount + 1);
    // const [page, setPage] = React.useState(0);
    // const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
      this.setState({ newPage: page });
    };

    const handleChangeRowsPerPage = event => {
      this.setState({ rowsPerPage: parseInt(event.target.value, 10) });
      this.setState({ page: 0 });
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={paintings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={() => handleChangePage(page)}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />

        {/* <nav>
          <ul>
            {pages.map(page => (
              <li
                key={page}
                className={
                  page === currentPage ? "pageItem active" : "page-item"
                }
              >
                <a onClick={() => this.handlePageChange(page)}>{page}</a>
              </li>
            ))}
          </ul>
        </nav> */}
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

export default connect(mapStateToProps, { getPaintings })(Admin);
