import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from "react-redux";
import { Button } from '@material-ui/core';
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
    const history = useHistory();
    const selectedItem = useSelector(state => state.selectedItem);

    return (
      <>
        <Button
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
