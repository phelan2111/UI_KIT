import { useAppSelector } from "@/hooks/redux";
import { dataLangue, funcLangue } from "./langue";

export const sliceLangue = {
  useGetState: () => useAppSelector(dataLangue),
  func: funcLangue,
};
