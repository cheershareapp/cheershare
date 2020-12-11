import React from 'react';
import CheerPin from "components/CheerPin";

function byRow(a, b) {
    return a.rowIndex - b.rowIndex;
}

function CheerList({ data, editable, children }) {
    data = (data || []).sort(byRow);

    return <>
            { data.map((item, index) =>
                <CheerPin {...item} index={index} key={item.id} editable={editable}/>)}
            { children }
    </>;
}

export default CheerList;