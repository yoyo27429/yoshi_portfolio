export type ModalType = {
  title: string;
  desc: string;
};

export type Modal3Type = ModalType & {
  desc2: string;
  buttonText: string;
  buttonText2: string;
};

export type Modal4Type = ModalType & {
  name: string;
  time: string;
  desc2: string;
  link: projectDataType[];
  closeFun: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export type projectDataType = {
  name: string;
  password: string;
};

export type Modal5Type = ModalType & {
  tag: string;
  tagColor: 1 | 2;
  // closeFun: (event: React.MouseEvent<HTMLDivElement>) => void;
};
