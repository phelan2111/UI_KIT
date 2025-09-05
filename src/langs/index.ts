import { useAppSelector } from "@/hooks/redux";
import { dataLangue } from "@/redux/slice/langue";
import { dataLocalizeEN } from "@/langs/data/en";
import { dataLocalizeVI } from "@/langs/data/vi";

export enum Langue {
  vietNamese = 0,
  english,
}

function Localize(localize: string) {
  const lang = useAppSelector(dataLangue);

  switch (lang) {
    case Langue.vietNamese:
      return dataLocalizeVI[localize];
    default: {
      return dataLocalizeEN[localize];
    }
  }
}

export default Localize;
