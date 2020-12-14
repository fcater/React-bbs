import React, { Component } from "react";
import { getArticles } from "../fakeNewsApi";
import { LikeSVG, TalkSVG, ShareSVG, HeartSVG } from "./common/SVG";
import ShareBox from "./common/shareBox";
import CreatBox from "./common/creatBox";
import Draggable from "react-draggable";

class Container extends Component {
  state = {
    articles: getArticles(),
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

  gettime = () => {
    const date = new Date();
    const newdate = date.toLocaleString("chinese", { hour12: false });
    const datelabel =
      newdate.slice(5, 7) +
      "月" +
      newdate.slice(8, 10) +
      "日 " +
      newdate.slice(10, 15);
    return datelabel;
  };

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
    articles.pop(a);
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
      newArticleTitle,
      newArticleImgUrl,
      newArticlePlaceholder,
    } = this.state;
    const article = { ...articles[0] };
    article.title = newArticleTitle;
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

  render() {
    // const { theme } = this.props;
    const datelabel = this.gettime();
    // console.log(datelabel, theme);
    // componentWillMount = () => {
    //   const upLoadRef = useRef();
    //   console.log(this);
    // };

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
          />
          {this.state.articles.map((a) => (
            <div
              key={a.id}
              className="p-1 mb-3 bg-white"
              onMouseEnter={() => this.handleMouseEnter(a)}
              onMouseLeave={() => this.handleMouseLeave(a)}
            >
              {a.sharer && (
                <a
                  className="ml-2 mb-0 mt-2"
                  href="https://user.qzone.qq.com/1303140304"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {a.sharer}
                </a>
              )}
              <div className="card  border-secondary bg-light">
                <div className="card-body">
                  <div
                    className="d-flex justify-content-between"
                    style={{ height: "100%", width: "100%" }}
                  >
                    <a
                      className="d-flex justify-content-start p-2"
                      href="https://user.qzone.qq.com/1303140304"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={a.portrait}
                        alt=""
                        className="pl-0 pr-0 rounded-circle  "
                        style={{ width: "4em", height: "4em" }}
                      />

                      <div className="col" width={"20%"}>
                        <h6
                          className="card-title mt-1"
                          style={{ fontSize: "1em", fontWeight: "bold" }}
                        >
                          {a.userId}
                        </h6>
                        <h6 className="mt-3" style={{ fontSize: "1em" }}>
                          {datelabel}
                        </h6>
                      </div>
                    </a>
                    {a.focus && (
                      <div
                        className="pointer"
                        onClick={() => this.handleDelete(a)}
                        style={{
                          color: "red",
                          height: "30px",
                          width: "30px",
                          textAlign: "center",
                        }}
                      >
                        x
                      </div>
                    )}
                  </div>
                  <h6 className="card-subtitle mt-2 mb-2 text-muted font-weight-bold">
                    {a.title}
                  </h6>
                  {a.content && (
                    <p className="card-text font-weight-bolder">{a.content}</p>
                  )}
                  {a.img && (
                    <img
                      width="60%"
                      src={a.img}
                      alt=""
                      className="card-img-botton"
                    />
                  )}
                  <div
                    className="d-flex justify-content-between mt-3"
                    style={{ width: "100%" }}
                  >
                    <HeartSVG likedNum={a.likedNum} />
                    <div
                      className="d-flex justify-content-between ml-auto"
                      style={{ width: "18%" }}
                    >
                      <LikeSVG a={a} onLiked={() => this.handleLike(a)} />
                      <TalkSVG a={a} onTalk={() => this.handleTalk(a)} />
                      <ShareSVG
                        a={a}
                        onShare={() => this.handleShareBoxOpen(a)}
                      />
                    </div>
                  </div>
                  {a.comment.map((c) => (
                    <div
                      className="d-flex justify-content-start m-1 ml-4 border border-primary rounded-pill"
                      key={c.id}
                      style={{
                        width: "80%",
                        backgroundColor: "rgb(245,245,245)",
                      }}
                      onMouseEnter={() => {
                        this.handleMouseEnterComment(a, c);
                      }}
                      onMouseLeave={() => {
                        this.handleMouseLeaveComment(a, c);
                      }}
                    >
                      <img
                        src={c.portrait}
                        alt=""
                        className="ml-2 mt-auto mb-auto pl-0 pr-0 rounded-circle"
                        style={{ width: "3em", height: "3em" }}
                      />
                      <div style={{ width: "60%" }}>
                        <h6
                          className="card-title pt-2 mb-1"
                          style={{ fontSize: "1em" }}
                        >
                          {c.userId}：{c.content}
                        </h6>
                        <p className="mb-1">{datelabel}</p>
                      </div>
                      {c.mouseEnterComment && (
                        <div
                          className="mt-auto mb-auto pointer text-danger"
                          onClick={() => this.handleCommentDelete(a, c)}
                        >
                          x
                        </div>
                      )}
                    </div>
                  ))}

                  <div
                    className="d-flex justify-content-start mt-2 "
                    onFocus={() => this.handleFocus(a)}
                    onBlur={() => this.handleBlur(a)}
                  >
                    <textarea
                      id={a.id}
                      name="text"
                      value={this.state.talk[a.id]}
                      cols="40"
                      rows={a.focusHeight}
                      className="form-control"
                      aria-label="Text input with radio button"
                      placeholder={
                        this.state.commentTip[a.id] || "组织语言中..."
                      }
                      maxLength="100"
                      onChange={this.handleChange.bind(this, a)}
                      style={{ resize: "none", width: "90%" }}
                    />
                    <input
                      type="button"
                      className="btn border-0 shadow-none text-light bg-primary ml-4 "
                      value="发送"
                      onClick={() => this.handleComment(a)}
                    />
                  </div>
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
