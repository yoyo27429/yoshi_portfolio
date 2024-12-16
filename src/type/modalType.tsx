export type ModalType = {
  title: string;
  desc: string;
};

export type Modal3Type = Modal & {
  desc2: string;
  buttonText: string;
  buttonText2: string;
};

export type Modal4Type = Modal & {
  name: string;
  time: string;
  desc2: string;
  link: string[];
  clickLink: (com: string, index: number) => void;
  closeFun: void;
};

export type Modal5Type = Modal & {
  tag: string;
  tagColor: number;
};
