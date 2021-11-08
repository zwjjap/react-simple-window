//@author:zengwei
//@date:2021/7/21

import React,{useEffect,useRef,useState,forwardRef,useImperativeHandle,useCallback} from 'react';
import _ from 'lodash';
import './style.less';

//上下 多加载行数
const moreLoading = 6;

function FixedSizeList(props,ref){

    const {children,render,itemCount,itemSize,height,gap=0} = props;

    useImperativeHandle(ref, () => ({
        scrollIng
    }));

    const [startPos,setStartPos] = useState(0);

    const [needRenderRows,setNeedRenderRows] = useState(null);

    const rapWindowWrap = useRef(null);
    const cash_v = useRef({});

    //可以展示的 行数
    const showRowNum = useRef(0);
    showRowNum.current = Math.ceil(height / (itemSize + gap));

    const interSetTime = useRef(null);

    const renderRow = (s_Pos) => {
        let needRenderRows = [];
        //let s_index =  (s_Pos > itemCount - showRowNum.current) ? 0 : s_Pos;
        // let endPos = showRowNum.current + s_index + (gap ? 2 : 1);

        let s_index =  s_Pos - moreLoading;

        if(s_index <= 0 ){
            s_index = 0;
        }

        let endPos = showRowNum.current + s_Pos + (gap ? moreLoading + 1 : moreLoading);

        if(endPos >= itemCount){
            endPos = itemCount;
        }

        for(let i=s_index;i<endPos;i++){
            needRenderRows.push(render && render(i,{position:'absolute',left:0,top:i*(itemSize + gap) + 'px',height:itemSize+'px'},i) || '')
        }
        return needRenderRows;
    };

    //获取表格滚动信息
    const scrollIng = (v) => {
        cash_v.current = v;
        //起始位置
        const start = Math.floor(v.y / (itemSize + gap));
        if(interSetTime.current){
            clearTimeout( interSetTime.current);
        }
        interSetTime.current = setTimeout(() => {
            setStartPos(start);  
        },15);
    };


    //处理仅编辑表格 出现的bug 
    useEffect(() => {
       
        if(rapWindowWrap.current.parentNode.scrollLeft!=cash_v.current.x){
            rapWindowWrap.current.parentNode.scrollLeft  = cash_v.current.x;
        }

        if(rapWindowWrap.current.parentNode.scrollTop != cash_v.current.y){
            rapWindowWrap.current.parentNode.scrollTop = cash_v.current.y;
        }

        return () => {
            clearTimeout(interSetTime.current);
        }

    },[startPos]);

    return(
        <div ref={rapWindowWrap} className="rap-window-wrap" style={{height:`${itemCount * (itemSize + gap)}px`}}>
            {renderRow(startPos)}
        </div>
    )
}

export default forwardRef(FixedSizeList);