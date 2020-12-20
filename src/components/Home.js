import React from "react";
import { List, ListItem, makeStyles, Divider, Box } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Pagination from "@material-ui/lab/Pagination";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Skeleton from "@material-ui/lab/Skeleton";
import Rating from "@material-ui/lab/Rating";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import getData from "../api/api"; 
import * as actions from "../store/actions/action";

const useStyles = makeStyles(theme => ({
  root: {
    width: "60%",
    height: "30%",
    backgroundColor: theme.palette.background.paper
  },
  item: {
    padding: theme.spacing(1.2)
  },
  avatar: { marginRight: theme.spacing(5) },
  paginator: {
    justifyContent: "center",
    padding: "10px"
  },
  card: {
    maxWidth: 345,
    maxHeight: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  Rating: {
    display: "flex",
    flexDirection: "row",
    "& > * + *": {
      marginTop: theme.spacing(1)
    }
  }
}));

const Home = (props) => {
    const itemsPerPage = 8;

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [expanded, setExpanded] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [noOfPages] = React.useState(
        Math.ceil(60 / itemsPerPage)
    );

    const projectsList = useSelector(state => state.data);
    const page = useSelector(state => state.pageNumber);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        const url =
            `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${page}/8`;
        getData(url).then(
            response => {
                dispatch(actions.setData(response.data.products));
                setLoading(false);
            },
            error => {
                console.log(error);
            }
        );
    }, []);

    const handleChange = (event, value) => {
      dispatch(actions.setPageNumber(value));
        const url =
            `https://mobile-tha-server-8ba57.firebaseapp.com/walmartproducts/${value}/8`;
        getData(url).then(
            response => {
                dispatch(actions.setData(response.data.products));
                setLoading(false);
            },
            error => {
                console.log(error);
            }
        );

    };

    return (
        <div>
            <List dense compoent="span">
                {projectsList
                    .map((projectItem, index) => {
                        return (
                          <ListItem key={index}>
                            <Card className={classes.root}>
                              <CardHeader
                                avatar={
                                  loading ? (
                                    <Skeleton
                                      animation="wave"
                                      variant="circle"
                                      width={40}
                                      height={40}
                                    />
                                  ) : (
                                    <Avatar
                                      aria-label="recipe"
                                      className={classes.avatar}
                                    >
                                      R
                                    </Avatar>
                                  )
                                }
                                action={
                                  <IconButton aria-label="settings">
                                    <MoreVertIcon></MoreVertIcon>
                                  </IconButton>
                                }
                                title={
                                  loading ? (
                                    <Skeleton
                                      animation="wave"
                                      height={10}
                                      width="80%"
                                      style={{ marginBottom: 6 }}
                                    />
                                  ) : (
                                    projectItem.productName
                                  )
                                }
                                subheader={
                                  loading ? (
                                    <Skeleton
                                      animation="wave"
                                      height={10}
                                      width="40%"
                                    />
                                  ) : (
                                        projectItem.inStock ? projectItem.price: 'Out Of Stock'
                                  )
                                }
                              />
                              <CardActionArea
                                onClick={() => { dispatch(actions.setSelectedIndex(projectItem)); history.push("/productdetails") }}
                              >
                                {loading ? (
                                  <Skeleton
                                    animation="wave"
                                    variant="rect"
                                    className={classes.media}
                                  />
                                ) : (
                                  <CardMedia
                                    className={classes.media}
                                    // image={`https://mobile-tha-server-8ba57.firebaseapp.com/${projectItem.productImage}`}
                                    image="https://assets.epicurious.com/photos/5764583142e4a5ed66d1df6c/master/pass/seafood-paella.jpg"
                                    title="Click to see Product Details"
                                  />
                                )}
                                <CardContent>
                                  {loading ? (
                                    <React.Fragment>
                                      <Skeleton
                                        animation="wave"
                                        height={10}
                                        style={{ marginBottom: 6 }}
                                      />
                                      <Skeleton
                                        animation="wave"
                                        height={10}
                                        width="80%"
                                      />
                                    </React.Fragment>
                                  ) : (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: projectItem.shortDescription
                                      }}
                                    />
                                  )}
                                </CardContent>
                              </CardActionArea>
                              <CardActions disableSpacing>
                                {loading ? (
                                  <React.Fragment>
                                    <Skeleton
                                      animation="wave"
                                      height={10}
                                      style={{ marginBottom: 6 }}
                                    />
                                    <Skeleton
                                      animation="wave"
                                      height={10}
                                      width="80%"
                                    />
                                  </React.Fragment>
                                ) : (
                                  <div className={classes.Rating}>
                                    <Rating
                                      name="half-rating-read"
                                      defaultValue={projectItem.reviewRating}
                                      precision={0.5}
                                      readOnly
                                    />
                                    <strong>{projectItem.reviewCount}</strong>
                                  </div>
                                )}
                                <IconButton
                                  className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded
                                  })}
                                  onClick={handleExpandClick}
                                  aria-expanded={expanded}
                                  aria-label="show more"
                                >
                                  <ExpandMoreIcon />
                                </IconButton>
                              </CardActions>
                              <Collapse
                                in={expanded}
                                timeout="auto"
                                unmountOnExit
                              >
                                <CardContent>
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: projectItem.longDescription
                                    }}
                                  />
                                </CardContent>
                              </Collapse>
                            </Card>
                          </ListItem>
                        );
                    })}
            </List>
            <Divider />
            <Box component="span">
                <Pagination
                    count={noOfPages}
                    page={page}
                    onChange={handleChange}
                    defaultPage={1}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    classes={{ ul: classes.paginator }}
                />
            </Box>
        </div>
    );
};

export default Home;
