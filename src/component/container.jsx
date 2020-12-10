import React, { Component } from "react";
import { getArticles } from "../fakeNewsApi";
import ShareBox from "./common/shareBox";
import { LikeSVG, TalkSVG, ShareSVG, HeartSVG } from "./common/SVG";

class Container extends Component {
  state = {
    articles: getArticles(),
    inputSize: 1,
    talk: "",
    shareword: "",
    commentTip: "最大输入不超过100个字",
    shareTip: "请输入",
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

  resize = (i) => {
    i === 1 ? (i = 3) : (i = 1);
    this.setState({ inputSize: i });
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

  handleChange = (e) => {
    let talk = { ...this.state.talk };
    talk = e.currentTarget.value;
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
    talk
      ? (commentTip = "最大输入不超过100个字")
      : (commentTip = "必须输入内容");
    talk &&
      a.comment.push({
        id: commentId,
        userId: "Fcater",
        portrait:
          "https://qlogo1.store.qq.com/qzone/1303140304/1303140304/50?1527840070",
        content: talk,
      });
    this.setState({ articles, talk: "", commentTip });
  };

  handleShare = (a) => {
    a.share = false;
    a.shareBox = !a.shareBox;
    let { articles, shareword } = this.state;
    const article = { ...a };
    article.sharer = `Fcater :${shareword}`;
    article.id++;
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

  handleDrag = (a) => {
    console.log(a.currentTarget);
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
    const index = articles.indexOf(a);
    articles.pop(articles[index]);
    this.setState({ articles });
  };

  handleCommentDelete = (c) => {
    console.log("显示删除按钮");
  };

  render() {
    const { theme } = this.props;
    const datelabel = this.gettime();
    // console.log(datelabel, theme);
    return (
      <div className="col">
        {this.state.articles.map((a) => (
          <div
            key={a.id}
            className="card mt-3 pl-1 pr-1 bg-white"
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
                    className="row"
                    key={c.id}
                    style={{ height: "70%", width: "70%" }}
                    onMouseEnter={() => {
                      this.handleCommentDelete(c);
                    }}
                  >
                    <img
                      src={c.portrait}
                      height="100%"
                      alt=""
                      className="ml-3 pl-0 pr-0 rounded-circle col-1"
                    />
                    <div className="col">
                      <h6 className="card-title mb-1">
                        {c.userId}：{c.content}
                      </h6>
                      <p>{datelabel}</p>
                    </div>
                    <div className="col">x</div>
                  </div>
                ))}

                <div className="d-flex flex-column mt-2 ">
                  <textarea
                    id={a.id}
                    name="text"
                    value={this.state.talk}
                    cols="50"
                    rows={a.focusHeight}
                    height="60px"
                    className="form-control "
                    aria-label="Text input with radio button"
                    placeholder={this.state.commentTip}
                    maxLength="100"
                    onChange={this.handleChange}
                    onFocus={() => this.handleFocus(a)}
                    onBlur={() => this.handleBlur(a)}
                  />
                  <input
                    type="button"
                    className="btn ml-auto border-0 p-0 m-2 shadow-none FB position-absolute"
                    value="发表"
                    onClick={() => this.handleComment(a)}
                  />
                </div>
              </div>
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
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Container;
