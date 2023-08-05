import StaticTable from "./components/StaticTable";
import DynamicTable from "./components/DynamicTable";

import Text from "./components/Text";
import Number from "./components/Number";
import Label from "./components/Label";
import Select from "./components/Select";

export const TABLE_TYPE = {
    [true]: 'DYNAMIC',
    [false]: 'STATIC',
}

export const TABLE_TYPE_VS_COMPONENT = {
    'STATIC': StaticTable,
    'DYNAMIC': DynamicTable,
}

export const INPUT_TYPE = {
    1: Text,
    2: Number,
    3: Select,
    7: Label,
    4: Label,
    5: Label,
}