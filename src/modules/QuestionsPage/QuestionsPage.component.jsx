import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPosts } from '../../redux/posts/posts.actions';
import handleSorting from '../../utils/handleSorting';

import LinkButton from '../../components/molecules/LinkButton/LinkButton.component';
import PostItem from '../../components/molecules/PostItem/PostItem.component';
import Spinner from '../../components/molecules/Spinner/Spinner.component';
import ButtonGroup from '../../components/molecules/ButtonGroup/ButtonGroup.component';
import SearchBox from '../../components/molecules/SearchBox/SearchBox.component';
import Pagination from "../../components/organisms/Pagination/Pagination.component";
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import React from 'react';
import { Typography } from '@mui/material';
import { Box, Grid, Link } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


import './QuestionsPage.styles.scss';
import axios from 'axios';
import { allSearchData } from '../../api/searchApi';

const itemsPerPage = 10;

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const QuestionsPage = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState('Newest');
  const [searchData, setSearchData] = useState()
  const [searchText, setSearchText] = useState("")
  function handleSubmit() {
    let data = allSearchData(searchText, page).then((e) => {
      setPosts(e.data)
    })
    // setSearchData(data.data)
    // console.log(searchData.data)
  }

  React.useEffect(() => {
    // if (!posts) { 
      handleSubmit()
    // }
  }, [page])

  // function handleChange(event) {
  //   (event) => {
  //     console.log(event)
  //   }
  // }

  // let searchQuery = new URLSearchParams(useLocation().search).get('search')
  let searchQuery = "search";

  const handlePaginationChange = (e, value) => setPage(value);

  return  (<Fragment>
      <div id='mainbar' className='questions-page fc-black-800'>
        <div className='questions-grid'>
          <h3 className='questions-headline'>
            {searchQuery ? 'Search Results' : 'All Questions'}
          </h3>
          <div className='questions-btn'>
            <LinkButton
              text={'Ask Question'}
              link={'/add/question'}
              type={'s-btn__primary'}
            />
          </div>
        </div>
        {searchQuery ? (
          <div className='search-questions'>
            <span style={{ color: '#acb2b8', fontSize: '12px' }}>
              Results for {searchText}
            </span>
            <SearchBox placeholder={'Search...'} name={'search'} pt={'mt8'} handleSubmit={handleSubmit} value={searchText} handleChange={setSearchText} />
          </div>
        ) : (
          ''
        )}
        
        <div className='questions-tabs'>
          <span>
             {/* {new Intl.NumberFormat('en-IN').format(posts.length)} results */}
          </span>
          <ButtonGroup
            buttons={['Newest', 'Top', 'Views', 'Oldest']}
            selected={sortType}
            setSelected={setSortType}
          />
        </div>
        <div className='questions'>
          {
            !posts ? <div>no post</div> : posts.map((post) => {
              return (
                <Box ml={3} >
                  <Box display="flex" flexDirection="row" my={3}>
                    <Box display="flex" flexDirection="column">
                        <Typography color={'#29a329'} variant={'h7'}>{post.vote} votes</Typography>
                        <Typography>{post.question_count_answer} answer</Typography>
                    </Box>
                    <Box pl={3} display="flex" alignSelf="center" flexDirection="column">
                        <Link target={"blank"} href={post.quesion_url} variant={"h6"}>{post.quesion_content}</Link>
                        <div className='sumary'>
                          {
                          post.type ? <Typography textOverflow="ellipsis" overflow= "hidden" >{post.content}</Typography> : <Typography>{post.title}</Typography>
                          }
                          </div>
                    </Box>
                  </Box>
                  <Divider light />

                </Box>
              )
            }
            )
          /* {posts
            .filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))
            ?.sort(handleSorting(sortType))
            .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage)
            .map((post, index) => (
              <PostItem key={index} post={post} />
            ))} */}
        </div>
        <Box display="flex" width="100%">
          <Box justifyContent="center" >
      
          <button onClick={() => {
            if (page == 1) {
              setPage(page)
            } else {
              setPage(page - 1)
            }
          }}>&laquo;</button>
          <button onClick={() => {
            setPage(1)
          }}>1</button>
          <button onClick={() => {
            setPage(2)
          }}>2</button>
          <button onClick={() => {
            setPage(3)
          }}>3</button>
          <button href="#">&raquo;</button>
        </Box></Box>
        {/* <Pagination
          page={page}
          // itemList={posts.filter((post) => post.title.toLowerCase().includes(searchQuery ? searchQuery : ''))}
          itemsPerPage={itemsPerPage}
          handlePaginationChange={handlePaginationChange}
        /> */}

      </div>
    </Fragment>
  );
};

// QuestionsPage.propTypes = {
//   getPosts: PropTypes.func.isRequired,
//   post: PropTypes.object.isRequired,
// };


export default (QuestionsPage);
