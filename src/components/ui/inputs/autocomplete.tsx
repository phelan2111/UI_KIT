/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";
import type { ItemSelect, SelectProps } from "./select";
import Select from "./select";
import { useDebounce } from "@/hooks/useDebounce";
import { Helper } from "@/utils/helper";
import { Logger } from "@/utils/logger";

function Autocomplete({ data, ...props }: SelectProps) {
  const [searchValue, setSearchValue] = useState<string>("");
  const debounceSearch = useDebounce(searchValue, 500);

  const dataSearch: ItemSelect[] = useMemo(() => {
    if (!Helper.isEmpty(searchValue)) {
      Logger.debug("SearchValue:", searchValue);
      return Helper.searchText(data, searchValue, "label");
    }
    return data;
  }, [data, debounceSearch]);

  return (
    <Select
      onChangeInput={(dataItem) => {
        setSearchValue(dataItem);
      }}
      onChange={() => {
        setSearchValue("");
      }}
      className="pointer-events-auto"
      {...props}
      data={dataSearch}
    />
  );
}

export default Autocomplete;
