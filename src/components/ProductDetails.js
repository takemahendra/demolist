import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { useSelector, useDispatch } from "react-redux";
import { Grid, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  avatar: {
    width: "60%",
    height: "60%"
  }
}));

const ProductDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const selectedItem = useSelector(state => state.selectedItem);
    console.log("selectedItem" + JSON.stringify(selectedItem));

    return (
      <>
        <Button
          margin={10}
          variant="contained"
          color="primary"
          onClick={() => history.push("/")}
        >
          BACK
        </Button>

        <List className={classes.root}>
          <ListItem>
            <ListItemText
              primary={`Product Name  - ${selectedItem.productName}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Product Id  - ${selectedItem.productId}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Product price  - ${selectedItem.price}`} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Product Review Rating  - ${selectedItem.reviewRating}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Product Review Count  - ${selectedItem.reviewCount}`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={`Product In Stock  - ${selectedItem.inStock}`}
            />
          </ListItem>
          <ListItem>
            <div>
              <ListItemText primary={`Short Description`} />
              <div
                style={{ marginLeft: 40 }}
                dangerouslySetInnerHTML={{
                  __html: selectedItem.shortDescription
                }}
              />
            </div>
          </ListItem>
          <ListItem>
            <div>
              <ListItemText primary={`Long Description`} />
              <div
                style={{ marginLeft: 40 }}
                dangerouslySetInnerHTML={{
                  __html: selectedItem.longDescription
                }}
              />
            </div>
          </ListItem>
          <ListItem>
            <Avatar
              className={classes.avatar}
              src={`https://mobile-tha-server-8ba57.firebaseapp.com/${selectedItem.productImage}`}
            ></Avatar>
          </ListItem>
        </List>
      </>
    );
}

export default ProductDetails;
