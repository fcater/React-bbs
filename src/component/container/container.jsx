import React, { Component } from "react";
import { getArticles, gettime, getArticleDemo } from "./../../fakeNewsApi";
import ShareBox from "../common/shareBox";
import CreatBox from "../common/creatBox";
import CommentArea from "./commentArea";
import Comment from "./comment";
import SVG_Group from "./SVG-group";
import User from "./user";
import Draggable from "react-draggable";
import ArticleInfo from "./articleInfo";
import Sharer from "./sharer";

class Container extends Component {
  state = {
    articles: getArticles(),
    articleDemo: getArticleDemo(),
    talk: {},
    shareword: "",
    commentTip: {},
    shareTip: "请输入",
    newArticleTitle: "",
    newArticleImgUrl: "",
    newArticlePlaceholder: "诉说现在的想法",
  };

  constructor(props) {
    super(props);
    this.imgRef = React.createRef();
  }

  componentDidMount() {}

  handleFocus = (article) => {
    const { articles } = this.state;
    articles[articles.indexOf(article)].focusHeight = 3;
    article.talk = true;
    this.setState({ articles });
  };

  handleBlur = (article) => {
    const { articles } = this.state;
    articles[articles.indexOf(article)].focusHeight = 1;
    article.talk = false;
    this.setState({ articles });
  };

  handleLike = (article) => {
    const { articles } = this.state;
    const index = articles.indexOf(article);
    articles[index].liked = !articles[index].liked;
    articles[index].disliked = false;

    articles[index].liked
      ? (articles[index].likedNum += 1)
      : (articles[index].likedNum -= 1);

    this.setState({ articles });
  };

  handleChange = (a, e) => {
    let talk = { ...this.state.talk };
    talk[a.id] = e.currentTarget.value;
    this.setState({ talk });
  };

  handleTalk = (article) => {
    article.talk = !article.talk;
    const { articles } = this.state;
    article.talk
      ? (articles[articles.indexOf(article)].focusHeight = 3)
      : (articles[articles.indexOf(article)].focusHeight = 1);
    this.setState({ articles });
  };

  handleComment = (a) => {
    let { articles, talk, commentTip } = this.state;
    const commentId = a.comment.length + 1;
    a.focusHeight = 1;
    a.talk = false;
    talk[a.id]
      ? (commentTip[a.id] = "还想再说...")
      : (commentTip[a.id] = "评论不能为空。");
    talk[a.id] &&
      articles[articles.indexOf(a)].comment.push({
        id: commentId,
        userId: a.userId,
        portrait:
          "http://r.photo.store.qq.com/psc?/V11wzYiE4Hy8dT/45NBuzDIW489QBoVep5mcXCCE9BbMyCwxJqW3B8V1hJ4SOOGGlQN36EpQZnbRRCLmhBSiOyHu9ockdCy0f3C7QTRW*YFS5BKF8Ote*IfNLQ!/r",
        content: talk[a.id],
      });
    talk[a.id] = "";
    this.setState({ articles, talk, commentTip });
  };

  handleShare = (a) => {
    a.liked = false;
    a.talk = false;
    a.share = false;
    a.focusHeight = 1;
    a.shareBox = !a.shareBox;
    let { articles, shareword } = this.state;
    const article = { ...a };
    article.sharer = `Fcater :${shareword}`;
    article.id = articles.length + 1;
    article.comment = [];
    article.likedNum = 0;
    articles.push(article);
    shareword = "";
    this.setState({ articles, shareword });
  };

  handleShareWord = (e) => {
    let { shareword } = this.state;
    shareword = e.currentTarget.value;
    this.setState({ shareword });
  };

  handleShareBoxOpen = (a) => {
    a.share = !a.share;
    const { articles } = this.state;
    articles.forEach((article) => {
      article.shareBox = false;
      article.share = false;
    });
    articles[articles.indexOf(a)].share = true;
    articles[articles.indexOf(a)].shareBox = true;
    this.setState({ articles });
  };

  handleShareBoxClose = (a) => {
    a.share = false;
    const { articles } = this.state;
    articles[articles.indexOf(a)].shareBox = false;
    this.setState({ articles });
  };

  handleMouseEnter = (a) => {
    const { articles } = this.state;
    articles[articles.indexOf(a)].focus = true;
    this.setState({ articles });
  };

  handleMouseLeave = (a) => {
    const { articles } = this.state;
    articles[articles.indexOf(a)].focus = false;
    this.setState({ articles });
  };

  handleDelete = (a) => {
    const { articles } = this.state;
    articles.splice(articles.indexOf(a), 1);
    this.setState({ articles });
  };

  handleMouseEnterComment = (a, c) => {
    const { articles } = this.state;
    articles[articles.indexOf(a)].comment[
      articles[articles.indexOf(a)].comment.indexOf(c)
    ].mouseEnterComment = true;
    this.setState({ articles });
  };

  handleMouseLeaveComment = (a, c) => {
    const { articles } = this.state;
    articles[articles.indexOf(a)].comment[
      articles[articles.indexOf(a)].comment.indexOf(c)
    ].mouseEnterComment = false;
    this.setState({ articles });
  };

  handleCommentDelete = (a, c) => {
    const { articles } = this.state;
    articles[articles.indexOf(a)].comment.pop(c);
    this.setState({ articles });
  };

  handleImgUpload = () => {
    this.imgRef.current.click();
  };

  handleImgUrl = () => {
    let { newArticleImgUrl } = this.state;
    const index = this.imgRef.current.files.length - 1;
    const url = window.webkitURL.createObjectURL(
      this.imgRef.current.files[index]
    );
    newArticleImgUrl = url;
    this.setState({ newArticleImgUrl });
  };

  handleNewArticleTitle = (e) => {
    let { newArticleTitle } = this.state;
    newArticleTitle = e.currentTarget.value;
    this.setState({ newArticleTitle });
  };

  handleNewArticle = () => {
    let {
      articles,
      articleDemo,
      newArticleTitle,
      newArticleImgUrl,
      newArticlePlaceholder,
    } = this.state;
    const article = { ...articleDemo };
    article.title = newArticleTitle;
    article.datelabel = gettime();
    article.img = newArticleImgUrl;
    article.id = articles.length + 1;
    article.likedNum = 0;
    article.comment = [];
    newArticleTitle || newArticleImgUrl
      ? articles.push(article)
      : (newArticlePlaceholder = "请输入内容或选择一张图片");
    newArticleTitle = newArticleImgUrl = "";

    this.setState({
      articles,
      newArticleTitle,
      newArticleImgUrl,
      newArticlePlaceholder,
    });
  };

  sortByTime = () => {
    const { articles } = this.state;
    return articles.reverse();
  };

  render() {
    // const { theme } = this.props;
    // console.log(theme);
    const sortedByTime = [...this.state.articles].reverse();

    return (
      <React.Fragment>
        <div className="col">
          <CreatBox
            ref={this.imgRef}
            newArticleTitle={this.state.newArticleTitle}
            imgUrl={this.state.newArticleImgUrl}
            placeholder={this.state.newArticlePlaceholder}
            onUpload={this.handleImgUpload}
            onUrlChange={this.handleImgUrl}
            onTitle={this.handleNewArticleTitle}
            onNewArticle={this.handleNewArticle}
          ></CreatBox>
          {sortedByTime.map((a) => (
            <div
              key={a.id}
              className="p-1 mb-3 bg-white"
              onMouseEnter={() => this.handleMouseEnter(a)}
              onMouseLeave={() => this.handleMouseLeave(a)}
            >
              <Sharer a={a} />
              <div className="card  border-secondary bg-light">
                <div className="card-body">
                  <User a={a} onDelete={this.handleDelete} />
                  <ArticleInfo a={a} />
                  <SVG_Group
                    a={a}
                    onLike={this.handleLike}
                    onTalk={this.handleTalk}
                    onShareBoxOpen={this.handleShareBoxOpen}
                  ></SVG_Group>
                  <Comment
                    a={a}
                    onMouseEnterComment={this.handleMouseEnterComment}
                    onMouseLeaveComment={this.handleMouseLeaveComment}
                    onCommentDelete={this.handleCommentDelete}
                  ></Comment>
                  <CommentArea
                    a={a}
                    talk={this.state.talk}
                    commentTip={this.state.commentTip}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onComment={this.handleComment}
                  ></CommentArea>
                </div>
                <Draggable
                  axis="both"
                  handle=".handle"
                  defaultPosition={{ x: 0, y: 0 }}
                  bounds={{
                    left: -820,
                    right: 625,
                    top: -470,
                  }}
                  position={null}
                  grid={[5, 5]}
                  scale={1}
                  onStart={this.handleStart}
                  onDrag={this.handleDrag}
                  onStop={this.handleStop}
                >
                  <div>
                    <ShareBox
                      shareword={this.state.shareword}
                      shareArticle={a}
                      shareBox={a.shareBox}
                      placeholder={this.state.shareTip}
                      onChange={this.handleShareWord}
                      onClose={() => this.handleShareBoxClose(a)}
                      onShare={() => this.handleShare(a)}
                    />
                  </div>
                </Draggable>
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }
}

export default Container;
