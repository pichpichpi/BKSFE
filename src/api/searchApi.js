import axios from 'axios';

// import { searchData as _searchData } from './urls';

export const allSearchData = (keyword, page) => {
  try {
    const requestString  = "http://127.0.0.1:5000/v1/search?" + `keyword=${keyword}&page=${page}`
    console.log(requestString)
    const data = axios.get(requestString);
    return data
  } catch (err) {
    console.log(err)
  }
}
