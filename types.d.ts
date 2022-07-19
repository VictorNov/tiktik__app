export interface Video {
  caption: string;
  video: {
    asset: {
      _id: string;
      url: string;
    };
    _id: string;
  };
  _id: string;
  postedBy: {
    _id: string;
    userName: string;
    image: {
      asset: {
        _ref: string;
        _type: string;
      };
      crop: {
        bottom: number;
        left: number;
        right: number;
        top: number;
        _type: string;
      };
      hotspot: {
        height: number;
        width: number;
        x: number;
        y: number;
        _type: string;
      };
      _type: string;
    };
  };
  likes: {
    _key: string;
    _ref: string;
    _type: string;
  }[];
  comments: {
    comment: string;
    _key: string;
    postedBy: {
      _id: string;
      userName: string;
      image: {
        asset: {
          _ref: string;
          _type: string;
        };
        crop: {
          bottom: number;
          left: number;
          right: number;
          top: number;
          _type: string;
        };
        hotspot: {
          height: number;
          width: number;
          x: number;
          y: number;
          _type: string;
        };
        _type: string;
      };
    };
  }[];
  userID: string;
}