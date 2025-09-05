export type TPath = {
  url: string;
  title: string;
};

export const Path: Record<string, TPath> = {
  None: {
    title: "Trang chủ",
    url: "/",
  },
  UI_Kit: {
    title: "UI-KIT",
    url: "/ui-kit",
  },
};
