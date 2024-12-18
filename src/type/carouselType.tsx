export type CarouselPropsType = {
  content: CarouselContentType[];
  selected: number;
};

export type CarouselContentType = {
  tabName: string;
  decs: string;
  image: string;
};
