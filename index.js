//@author:zengwei
//@date:2021/7/21

import React,{useEffect,useRef,useState,forwardRef,useImperativeHandle,useCallback} from 'react';
import './style.less';

function FixedSizeList(props,ref){

    const {children,render,itemCount,itemSize,height,gap=0} = props;

    useImperativeHandle(ref, () => ({
        scrollIng
    }));

    const [startPos,setStartPos] = useState(0);

    const rapWindowWrap = useRef(null);
    const cash_v = useRef({});

    //可以展示的 行数
    const showRowNum = useRef(0);
    showRowNum.current = Math.ceil(height / (itemSize + gap));


    //获取表格滚动信息
    const scrollIng = (v) => {
        cash_v.current = v;
        //起始位置
        const start = Math.floor(v.y / (itemSize + gap));
        setStartPos(start);
    };


    const renderRow = (s_Pos) => {
        let needRenderRows = [];
        let endPos = showRowNum.current + s_Pos + (gap ? 1 : 0);

        if(endPos >= itemCount){
            endPos = itemCount;
        }

        for(let i=s_Pos;i<endPos;i++){
            needRenderRows.push(render && render(i,{position:'absolute',left:0,top:i*(itemSize + gap) + 'px',height:itemSize+'px'},i) || '')
        }
        return needRenderRows;
    };


    //处理仅编辑表格 出现的bug 
    useEffect(() => {
        if(rapWindowWrap.current.parentNode.scrollLeft!=cash_v.current.x){
            rapWindowWrap.current.parentNode.scrollLeft  = cash_v.current.x;
        }

        if(rapWindowWrap.current.parentNode.scrollTop != cash_v.current.y){
            rapWindowWrap.current.parentNode.scrollTop = cash_v.current.y;
        }

    },[startPos]);


    return(
        <div ref={rapWindowWrap} className="rap-window-wrap" style={{height:`${itemCount * (itemSize + gap)}px`}}>
            {renderRow(startPos)}
        </div>
    )
}

export default forwardRef(FixedSizeList);