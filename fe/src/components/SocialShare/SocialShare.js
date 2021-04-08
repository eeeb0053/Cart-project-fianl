import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  PinterestShareButton,
  LinkedinShareButton,
} from 'react-share';
import {
  FaTwitter,
  FaFacebookF,
  FaPinterest,
  FaLinkedinIn,
} from 'react-icons/fa';

export const FaceBookShare = (props) => {
  const { title, shareURL } = props;
  return (
      <div className="facebook">
        <FacebookShareButton url={shareURL} quote={title}>
          <FaFacebookF /> Facebook
        </FacebookShareButton>
      </div>
  );
};

export const TwitterShare = (props) => {
  const { shareURL, title, author } = props;
  return (
      <div className="twitter">
        <TwitterShareButton url={shareURL} title={title} via={author}>
          <FaTwitter /> Twitter
        </TwitterShareButton>
      </div>
  );
};

export const LinkedInShare = (props) => {
  const { shareURL, title } = props;
  return (
      <div className="linkedin">
        <LinkedinShareButton
          url={shareURL}
          title={title}
          windowWidth={750}
          windowHeight={600}
        >
          <FaLinkedinIn /> LinkedIn
        </LinkedinShareButton>
      </div>
  );
};

export const PinterestShare = (props) => {
  const { shareURL, title, media } = props;
  const mediaForPinterest = media ? media[0].url : [];
  return (
      <div className="pinterest">
        <PinterestShareButton
          url={shareURL}
          media={mediaForPinterest}
          description={title}
        >
          <FaPinterest /> Pinterest
        </PinterestShareButton>
      </div>
  );
};