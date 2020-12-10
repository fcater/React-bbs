import React, { Component } from "react";
import ShareBox from "./common/shareBox";
import { Rnd } from "react-rnd";
import { getArticles } from "../fakeNewsApi";
import { LikeSVG, TalkSVG, ShareSVG, HeartSVG, PlusSVG } from "./common/SVG";

class Container extends Component {
  state = {
    articles: getArticles(),
    talk: {},
    shareword: "",
    commentTip: "最大输入不超过100个字",
    shareTip: "请输入",
    newAticle: false,
  };

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
      ? (commentTip = "最大输入不超过100个字")
      : (commentTip = "必须输入内容");
    talk[a.id] &&
      articles[articles.indexOf(a)].comment.push({
        id: commentId,
        userId: a.userId,
        portrait:
          "https://qlogo1.store.qq.com/qzone/1303140304/1303140304/50?1527840070",
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

  handleCreatAticle = () => {
    let { newAticle } = this.state;
    newAticle = !newAticle;
    this.setState({ newAticle });
  };
  test = () => {};

  render() {
    const { theme } = this.props;
    const datelabel = this.gettime();
    // console.log(datelabel, theme);
    return (
      <React.Fragment>
        <div className="col">
          {this.state.articles.map((a) => (
            <div
              key={a.id}
              className="card pl-1 pr-1 bg-white"
              onMouseEnter={() => this.handleMouseEnter(a)}
              onMouseLeave={() => this.handleMouseLeave(a)}
            >
              <a
                className="ml-2 mb-0 mt-2"
                href="https://user.qzone.qq.com/1303140304"
                target="_blank"
                rel="noopener noreferrer"
              >
                {a.sharer}
              </a>
              <div className="card mt-3 border-secondary bg-light">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <a
                      className="row p-3"
                      style={{ height: "60%", width: "60%" }}
                      href="https://user.qzone.qq.com/1303140304"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={a.portrait}
                        height="100%"
                        alt=""
                        className="pl-0 pr-0 rounded-circle col-2 "
                      />

                      <div className="col" width={"20px"}>
                        <h5 className="card-title mt-1">{a.userId}</h5>
                        <h6 className="mt-3">{datelabel}</h6>
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
                  <p className="card-text font-weight-bolder">{a.content}</p>
                  <img
                    width="60%"
                    src={a.img}
                    alt=""
                    className="card-img-botton"
                  />
                  <div className="d-flex mt-4">
                    <HeartSVG likedNum={a.likedNum} />
                    <div className=" ml-auto ">
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
                      className="row justify-content-start m-1 ml-4 border border-primary rounded-pill"
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
                        height="100%"
                        alt=""
                        className="ml-2 mt-auto mb-auto pl-0 pr-0 rounded-circle col-1"
                      />
                      <div className="col-xl-10">
                        <h6 className="card-title pt-2 mb-1">
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
                    className="d-flex flex-column mt-2 "
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
                      placeholder={this.state.commentTip}
                      maxLength="100"
                      onChange={this.handleChange.bind(this, a)}
                      style={{ resize: "none", width: "90%" }}
                    />
                    <input
                      type="button"
                      className="btn ml-auto border-0 p-0 m-2 shadow-none FB position-absolute"
                      value="发表"
                      onClick={() => this.handleComment(a)}
                    />
                  </div>
                </div>
                <Rnd
                  default={{
                    x: 50,
                    y: 300,
                    width: 500,
                    height: 45,
                  }}
                  minWidth={500}
                  minHeight={45}
                  maxWidth={500}
                  maxHeight={45}
                  bounds="window"
                >
                  <ShareBox
                    shareword={this.state.shareword}
                    shareArticle={a}
                    shareBox={a.shareBox}
                    placeholder={this.state.shareTip}
                    onChange={this.handleShareWord}
                    onClose={() => this.handleShareBoxClose(a)}
                    onShare={() => this.handleShare(a)}
                    onDrag={() => this.handleDrag(a)}
                  />
                </Rnd>
              </div>
            </div>
          ))}
        </div>
        <PlusSVG
          newAticle={this.state.newAticle}
          onNewAticle={this.handleCreatAticle}
        />
      </React.Fragment>
    );
  }
}

export default Container;
