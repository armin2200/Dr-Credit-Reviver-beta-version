import React, { Component } from 'react';
import styled, { css, cx } from 'react-emotion';
import ErrorPage from '../Error/Error';
import ShareIcon from '../ShareIcon/ShareIcon';
import Date from '../Date/Date';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { Link, Element } from 'react-scroll';
import Comment from '../../containers/Comment';
import { convertFromRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { api } from '../../services/api';

const Container = styled('div')`
  border: solid 1px rgba(179, 179, 179, 1);
  max-width: 1000px;
  background-color: rgba(255, 255, 255, 1);
  color: rgba(47, 46, 46, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 62px 5% 54px;
  margin: 20px auto;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.16), 0 2px 8px 0 rgba(0, 0, 0, 0.12);
`;
const Info = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 80%;
  line-height: 1.5;
  margin-bottom: 30px;
  font-family: 'Lora', serif;
  color: #656a73;
  font-style: italic;
  font-weight: 400;

  span {
    text-transform: capitalize;
  }
`;
const Article = styled('article')``;
const Title = styled('h2')`
  font-family: 'Fjalla One', sans-serif;

  font-size: 160%;
  font-weight: bolder;
  margin-bottom: 30px;
`;
const Body = styled('div')`
  font-family: 'Rubik', sans-serif;
  font-size: 90%;
  /* hyphens: auto; */
  text-align: justify;
  line-height: 1.5;
  text-indent: 35px;
`;
const Social = styled('div')`
  display: flex;
  flex-direction: row;
  margin: 30px 0 10px 0;
  border-bottom: solid 1px #d16666;
  border-top: solid 1px #d16666;
  padding: 10px 0;
`;

const SvgSource = styled('svg')`
  display: none;
`;

const Icon = styled('div')`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;
const Clip = styled('span')`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

const Share = css`
  margin: 0.5rem 2rem 0.5rem 0;
  color: #828282;
  transition: 250ms;
  &:last-child {
    margin-right: 0;
  }
  &:hover,
  &:focus {
    background: #f1f1f1;
    border-color: #333;
    border-radius: 15%;
  }
  &:focus {
    outline-color: inherit;
  }
`;
const Twitter = css`
  &:hover,
  &:focus {
    color: #00aced;
  }
`;
const Facebook = css`
  &:hover,
  &:focus {
    color: #3b5998;
  }
`;
const Linkedin = css`
  &:hover,
  &:focus {
    color: #1d87be;
  }
`;
const Bottom = styled('div')`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
  width: 100%;
`;
const ViewIcon = styled('span')`
  display: flex;
  font-family: 'Lora', serif;
  align-items: center;
  small {
    color: #828282;
  }
  svg {
    margin-right: 8px;
    height: 19px;
    fill: #828282;
  }
`;
const CommentIcon = styled('span')`
  display: flex;
  font-family: 'Lora', serif;
  position: relative;
  align-items: center;
  cursor: pointer;
  small {
    display: flex;
    align-items: center;
    justify-content: center;
    top: -7px;
    right: -7px;
    position: absolute;
    color: white;
    font-size: 12px;
    overflow: hidden;
    background: rgba(245, 49, 46, 0.68);
    height: 20px;
    width: 20px;
    border-radius: 50%;
  }
  svg {
    margin-right: 8px;
    height: 19px;
    fill: #828282;
  }
  &:hover svg {
    fill: black;
  }
`;
const LikeIcon = styled('span')`
  display: flex;
  font-family: 'Lora', serif;
  align-items: center;
  small {
    color: #828282;
  }
  svg {
    margin-right: 8px;
    height: 19px;
    fill: #3232af;
    cursor: pointer;
  }
`;
class ArticlePage extends Component {
  state = {
    article: null,
    toggle: false,
    appear: true,
    error: null,
    commentToggle: false,
    like: false
  };

  async componentDidMount() {
    const userID = this.props.currentUser.user._id;
    const articleId = this.props.match.params.id;
    let view = false;
    if (!sessionStorage[`${articleId}`]) {
      sessionStorage.setItem(`${articleId}`, 'true');
      view = true;
    }
    try {
      const { data } = await axios.get(
        `${api}/api/articles/${articleId}?view=${view}`
      );

      if (data.body) {
        data.body = EditorState.createWithContent(
          convertFromRaw(JSON.parse(data.body))
        );
      } else {
        data.body = EditorState.createEmpty();
      }
      let like = data.likes;
      if (like.includes(userID)) {
        like = true;
      } else {
        like = false;
      }
      this.setState({ article: data, like });
    } catch (error) {
      let err = {};
      if (!error.response) {
        // network error
        err = {
          status: 503,
          data: {},
          statusText: 'Network Error'
        };
      } else {
        err = {
          status: error.response.status,
          data: error.response.data,
          statusText: error.response.statusText
        };
      }
      this.setState({ error: err });
    }
  }

  toggleHandler = () => {
    this.setState(prevState => {
      return { toggle: !prevState.toggle, appear: false };
    });
  };
  commentToggleHandler = () => {
    this.setState(prevState => {
      return { commentToggle: !prevState.commentToggle };
    });
  };
  likeHandler = async () => {
    const articleId = this.props.match.params.id;
    const userID = this.props.currentUser.user._id;
    const likes = this.state.article.likes;
    const index = likes.indexOf(userID);
    if (userID) {
      try {
        if (index > -1) {
          likes.splice(index, 1);
        } else {
          likes.push(userID);
        }

        const { data } = await axios.patch(`${api}/api/articles/${articleId}`, {
          likes
        });
        console.log(data);
        this.setState(prevState => {
          return { like: !prevState.like };
        });
      } catch (error) {
        console.log(error.response);
      }
    }
  };
  render() {
    const { article, error } = this.state;
    if (!error && article)
      return (
        <React.Fragment>
          <Container>
            <Info>
              <div>
                <span>{article.author}</span> &middot;
                <span>
                  {' '}
                  <Date format={'MMM Do YYYY'} date={article.createdAt} />{' '}
                </span>
                &middot;
                <span> {article.readTime} min read</span>
              </div>
              {/* <ShareIcon
                appear={this.state.appear}
                isMounted={this.state.toggle}
                clicked={this.toggleHandler}
              /> */}
            </Info>
            <Article>
              <Title>{article.title}</Title>
              <Editor toolbarHidden readOnly editorState={article.body} />

              {/* <Body>{article.articleBody}</Body> */}
              <Social>
                <SvgSource width='0' height='0' aria-hidden='true'>
                  <symbol id='svg--twitter' viewBox='0 -7 15 30'>
                    <path d='M15.36 3.434c-0.542 0.241-1.124 0.402-1.735 0.476 0.624-0.374 1.103-0.966 1.328-1.67-0.583 0.346-1.23 0.598-1.917 0.733-0.551-0.587-1.336-0.954-2.205-0.954-1.668 0-3.020 1.352-3.020 3.019 0 0.237 0.026 0.467 0.078 0.688-2.51-0.126-4.735-1.328-6.224-3.155-0.261 0.446-0.41 0.965-0.41 1.518 0 1.048 0.534 1.972 1.344 2.514-0.495-0.016-0.961-0.151-1.368-0.378 0 0.013 0 0.025 0 0.038 0 1.463 1.042 2.683 2.422 2.962-0.253 0.069-0.52 0.106-0.796 0.106-0.194 0-0.383-0.018-0.568-0.054 0.384 1.2 1.5 2.073 2.821 2.097-1.034 0.81-2.335 1.293-3.75 1.293-0.244 0-0.484-0.014-0.72-0.042 1.336 0.857 2.923 1.357 4.63 1.357 5.554 0 8.592-4.602 8.592-8.593 0-0.13-0.002-0.261-0.009-0.39 0.59-0.426 1.102-0.958 1.507-1.563z' />
                  </symbol>

                  <symbol id='svg--facebook' viewBox='0 -7 16 30'>
                    <path d='M12 3.303h-2.285c-0.27 0-0.572 0.355-0.572 0.831v1.65h2.857v2.352h-2.857v7.064h-2.698v-7.063h-2.446v-2.353h2.446v-1.384c0-1.985 1.378-3.6 3.269-3.6h2.286v2.503z' />
                  </symbol>

                  <symbol id='svg--linkedin' viewBox='0 0 64 62.888'>
                    <path
                      d='M6.902,0c-4.229,0-6.988,2.85-6.9,6.646c-0.088,3.619,2.677,6.553,6.815,6.553
  c4.313,0,7.073-2.934,7.073-6.553C13.807,2.85,11.13,0,6.902,0z M0.345,62.888h13.114V18.074H0.345V62.888z M48.906,18.705
  c-4.189,0-8.471-0.866-13.029,6.204h-0.256l-0.23-6.831H23.782c0.174,3.708,0.196,9.245,0.196,14.507v30.303h13.113V36.992
  c0-1.215,0.17-2.42,0.51-3.285c0.861-2.414,3.018-4.917,6.645-4.917c4.744,0,6.646,3.708,6.646,9.139v24.959H64V36.291
  C64,23.869,57.531,18.705,48.906,18.705z'
                    />
                  </symbol>
                </SvgSource>

                <Icon>
                  <a href='' className={cx(Share, Twitter)}>
                    <svg
                      role='presentation'
                      className={css`
                        width: 100%;
                        max-width: 2rem;
                        height: 100%;
                        max-height: 2rem;
                        display: block;
                        margin: 0 auto;
                        fill: currentColor;
                      `}
                    >
                      <use xlinkHref='#svg--twitter' />
                    </svg>
                    <Clip>TWITTER</Clip>
                  </a>

                  <a href='' className={cx(Share, Facebook)}>
                    <svg
                      role='presentation'
                      className={css`
                        width: 100%;
                        max-width: 2rem;
                        height: 100%;
                        max-height: 2rem;
                        display: block;
                        margin: 0 auto;
                        fill: currentColor;
                      `}
                    >
                      <use xlinkHref='#svg--facebook' />
                      <Clip>FACEBOOK</Clip>
                    </svg>
                  </a>

                  <a href='' className={cx(Share, Linkedin)}>
                    <svg
                      role='presentation'
                      className={css`
                        width: 50%;
                        max-width: 2rem;
                        height: 100%;
                        max-height: 2rem;
                        display: block;
                        margin: 0 auto;
                        fill: currentColor;
                      `}
                    >
                      <use xlinkHref='#svg--linkedin' />
                      <Clip>LINKEDIN</Clip>
                    </svg>
                  </a>
                </Icon>
              </Social>
              <Bottom>
                <ViewIcon>
                  <svg
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 576 512'
                  >
                    <path d='M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z' />
                  </svg>
                  <small> {article.views}</small>
                </ViewIcon>
                <CommentIcon>
                  <Link
                    spy={true}
                    smooth={true}
                    duration={500}
                    to='commentBox'
                    onClick={this.commentToggleHandler}
                  >
                    <svg
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path d='M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z' />
                    </svg>
                    <small>
                      <span>{article.comments.length}</span>
                    </small>
                  </Link>
                </CommentIcon>
                <LikeIcon onClick={this.likeHandler}>
                  {this.state.like ? (
                    <svg
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z' />
                    </svg>
                  ) : (
                    <svg
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 512 512'
                    >
                      <path
                        fill='#3232af'
                        d='M458.4 64.3C400.6 15.7 311.3 23 256 79.3 200.7 23 111.4 15.6 53.6 64.3-21.6 127.6-10.6 230.8 43 285.5l175.4 178.7c10 10.2 23.4 15.9 37.6 15.9 14.3 0 27.6-5.6 37.6-15.8L469 285.6c53.5-54.7 64.7-157.9-10.6-221.3zm-23.6 187.5L259.4 430.5c-2.4 2.4-4.4 2.4-6.8 0L77.2 251.8c-36.5-37.2-43.9-107.6 7.3-150.7 38.9-32.7 98.9-27.8 136.5 10.5l35 35.7 35-35.7c37.8-38.5 97.8-43.2 136.5-10.6 51.1 43.1 43.5 113.9 7.3 150.8z'
                      />
                    </svg>
                  )}
                  <small> {article.likes.length}</small>
                </LikeIcon>
              </Bottom>
            </Article>
          </Container>

          <Element name='commentBox'>
            {this.state.commentToggle && (
              <Comment
                name='commentBox'
                comments={article.comments}
                articleId={article._id}
              />
            )}
          </Element>
        </React.Fragment>
      );
    else if (error)
      return <ErrorPage status={error.status} message={error.statusText} />;
    return <Loading />;
  }
}

export default ArticlePage;
