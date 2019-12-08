import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
//MUI stuff
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
//Icons
import NotificationsIcons from '@material-ui/icons/Notifications';
import FacoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import {connect } from 'react-redux';
import {markNotificationsRead} from '../../redux/actions/userActions';

class Notifications extends Component {
    state = { 
        anchorEl: null
     }
    render() { 
        const notifications = this.props.notifications;
        const anchoreEl = this.state.anchorEl;

        let notificationIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(not => not.read === false).length > 0
            ? notificationIcon = (
                <Badge badgeContent={notifications.filter(not => not.read === false).length}
                color="secondary">
                    <NotificationIcon/>
                </Badge>
            ): (
                notificationIcon = <NotificationIcon/>
            )} else {
                notificationIcon = <NotificationIcon/>
            }
        }
        return ( 

         );
    }
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired
}
 
const mapStateToProps = state => ({
    notifications: state.user.notifications
})
export default connect(mapStateToProps, {markNotificationsRead}(Notifications);