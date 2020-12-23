import React from "react";
import { LikeSVG, TalkSVG, ShareSVG, HeartSVG } from "../common/SVG";

const SVG_Group = (props) => {
  const { a, onLike, onTalk, onShareBoxOpen } = props;
  return (
    <div
      className="d-flex justify-content-between mt-3"
      style={{ width: "100%" }}
    >
      <HeartSVG likedNum={a.likedNum} />
      <div
        className="d-flex justify-content-between ml-auto"
        style={{ width: "18%" }}
      >
        <LikeSVG a={a} onLiked={() => onLike(a)} />
        <TalkSVG a={a} onTalk={() => onTalk(a)} />
        <ShareSVG a={a} onShare={() => onShareBoxOpen(a)} />
      </div>
    </div>
  );
};

export default SVG_Group;
