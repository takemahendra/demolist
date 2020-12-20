import axios from "axios";

const getData = (url) => {
    return axios({
        method: "get",
        url: url
    });
};
export default getData;
