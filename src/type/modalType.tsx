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
  link: string[];
  clickLink: (com: string, index: number) => void;
  closeFun: void;
};

export type Modal5Type = ModalType & {
  tag: string;
  tagColor: number;
};
