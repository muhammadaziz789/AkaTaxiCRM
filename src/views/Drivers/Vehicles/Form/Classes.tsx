import { useEffect, useState } from "react";
import SwitchBtn from "../../../../components/UI/Buttons/Switch";
import { Divider } from "@mui/material";

interface Props {
  classes: any;
  defaultValue?: any;
  setValue?: (val1?: any, val2?: any) => void;
  clas?: any;
  classIds?: number[];
}

const Classes = ({ classIds, clas, classes = [], setValue = () => { } }: Props) => {
  const [groupA, setGroupA] = useState([]);
  const [groupB, setGroupB] = useState([]);

  useEffect(() => {
    if (!classes?.length) return;

    const a = classes.slice(0, 3)?.map((i: any) => {

      console.log(classIds?.includes(parseInt(i.slug)));

      return {
        ...i,
        checked: classIds?.includes(parseInt(i.slug)),
      };
    });

    const b = classes.slice(3);

    setGroupA(a);
    setGroupB(b);
    const ids = a
      .concat(b)
      .filter((item: any) => item.checked)
      .map((item: any) => item.slug);

    setValue("ids", ids);


  }, [classes, clas, setValue]);

  const handleCheck = (name: string, check: boolean, group: string) => {
    if (group === "a") {
      const b: any = groupB.map((i: any) => {
        return {
          ...i,
          checked: false,
        };
      });
      setGroupB(b);

      const a: any = groupA.map((i: any) => {
        if (i.name === name) i.checked = check;
        return {
          ...i,
        };
      });

      setGroupA(a);
      
    } else {
      const a: any = groupA.map((i: any) => {
        return {
          ...i,
          checked: false,
        };
      });
      setGroupA(a);

      const b: any = groupB.map((i: any) => {
        if (i.name === name) i.checked = check;
        return {
          ...i,
        };
      });

      setGroupB(b);
    }
    const ids = groupA
      .concat(groupB)
      .filter((item: any) => item.checked)
      .map((item: any) => item.slug);

    setValue("ids", ids);
  };

  return (
    <>
      {groupA?.map((item: any) => (
        <SwitchBtn
          text={item.name}
          name={item.name}
          checked={item.checked}
          handleCheck={handleCheck}
          group="a"
        />
      ))}
      <Divider />
      {groupB?.map(
        (item: any) =>
          item.name !== "standart" && (
            <SwitchBtn
              text={item.name}
              name={item.name}
              handleCheck={handleCheck}
              checked={item.checked}
              group="b"
            />
          )
      )}
    </>
  );
};

export default Classes;