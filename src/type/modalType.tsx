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
  name: stringl;
  time: string;
  desc2: string;
  link: string[];
  closeFun: void;
};
