import { useState } from 'react';
import { TextField } from "@mui/material"
import RangeDate from "../../../components/RangeDate";
import CLabel from "../../CElements/CLabel";
import '../style.scss';
import { IoMdArrowDropdown } from "react-icons/io";
import usePageRouter from '../../../hooks/useObjectRouter';

interface Props {
    label?: string,
    control?: any,
    name: string,
    placeholder?: string,
    defaultValue?: any
}

const DropDown = ({ label, name, placeholder, defaultValue }: Props) => {
    const [show, setShow] = useState(false);
    const { getQueries } = usePageRouter();
    const query = getQueries();

    let value = query?.start && query?.end ? query?.start.slice(5) + ' - ' + query.end.slice(5) : 'Tanlang'

    const clickHandler = (e: any) => {
        e.length == 2 ? setShow(false) : setShow(false)
    }


    return (
        <div className='HFInput z-20'>
            <CLabel title={label} />
            <div className="relative" >
                <TextField
                    size="small"
                    name={name}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    InputProps={{ readOnly: true, endAdornment: <IoMdArrowDropdown size={18} /> }}
                    onClick={() => setShow(true)}
                />
                <div className="absolute right-[-380px] bg-yellow-500">
                    {show && <RangeDate footerActive={false} handlerValue={clickHandler} />}
                </div>
            </div>
        </div>
    )
}

export default DropDown