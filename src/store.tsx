// zustand
import { create } from "zustand";

export type PasswordState = {
  isShow: boolean;
  password: string;
  company: string;
  projectIndex: string;
  setShowModal: (pwd: string, com: string, index: number) => void;
  closeModal: () => void;
  clearProject: () => void;
};

export const useUserStore = create<PasswordState>()((set) => ({
  isShow: false,
  password: "",
  company: "",
  projectIndex: "",
  setShowModal: (pwd, com, index) =>
    set(() => ({
      isShow: true,
      password: pwd,
      company: com,
      projectIndex: index.toString(),
    })),
  closeModal: () =>
    set(() => ({
      isShow: false,
      password: "",
    })),
  clearProject: () =>
    set(() => ({
      company: "",
      projectIndex: "",
    })),
}));
