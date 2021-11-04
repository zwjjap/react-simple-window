### 下载
------

```
npm i react-simple-window --save
```





### 使用方法：

------

```



import FixedSizeList from 'react-simple-window';

export default APP(){
    
	return(
		<FixedSizeList
            ref={listRef}
            itemCount={'行数'}
            itemSize={'行高'}
            height={'高度'}
            render={(index,style) => {

       }}
      />
	)
}
```



### props

------

| 名称      | 默认值   | 描述         | 类型                  |
| --------- | -------- | ------------ | --------------------- |
| itemCount | 无       | 总条数       | number                |
| itemSize  | 无       | 行高         | number                |
| height    | ‘auto’   | 滚动区域高度 | number                |
| render    | （函数） | 滚动函数     | function(index,style) |



### 方法

------

|      |      |      |      |
| ---- | ---- | ---- | ---- |
|      |      |      |      |
|      |      |      |      |
|      |      |      |      |
|      |      |      |      |
