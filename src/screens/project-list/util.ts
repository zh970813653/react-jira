import { useMemo, useState } from "react";
import { useUrlQueryParam } from "../../utils/url";

export const useProjectSearchParams = () => {
  const [params] = useState(["name", "personId"])
  const [param, setParam] = useUrlQueryParam(params);
  return [
    useMemo(()=>(
        { 
            ...param, 
            personId: Number(param.personId) || undefined 
        }
    ),[param]),
    setParam
] as const
};
