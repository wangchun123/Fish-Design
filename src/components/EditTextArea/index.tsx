import React, { useEffect, useRef, useMemo, useState } from 'react'
import { Button } from 'antd';
import { cloneDeep } from 'lodash';
import { searchArrSameElementIndex } from './utils'

import './index.less'

const EditTextArea = () => {
    const contentRef = useRef(null)
    const leftRef = useRef(null);

    const [textareaValue, setTextareaValue] = useState('');
    const [orderNumberArr, setOrderNumberArr] = useState(() => new Array(50).fill({
        formatError: false,
        repeatError: false
    }))

    const fromatTextareaValue = (val) => {
        return val.split('\n')
    }

    const handleTextareaChange = (val) => {
        const valueArr = fromatTextareaValue(val);
        const fromatStrValue = valueArr.filter((item, index) => index < 50)
        setTextareaValue(fromatStrValue.join('\n'))
    }

    const handleSumbitData = () => {
        const valueArr = textareaValue.split('\n').filter(item => item);
        const formatErrorIndex = [];
        const repeatErrorIndex = searchArrSameElementIndex(valueArr).map(item => Number(item));

        valueArr.forEach((item, index) => {
            if (isNaN(item)) {
                formatErrorIndex.push(index)
            }
        })

        const newOrderNumberArr = cloneDeep(orderNumberArr);

        setOrderNumberArr(
            newOrderNumberArr.map((item, index) => {
                if (formatErrorIndex.includes(index)) {
                    return { ...item, formatError: true }
                }
                return { ...item, formatError: false }
            }).map((item, index) => {
                if (repeatErrorIndex.includes(index)) {
                    return { ...item, reportError: true }
                }
                return { ...item, reportError: false }
            })
        )

        handleRemoveEmptyRow();

        const flag = !!formatErrorIndex.length || !!repeatErrorIndex.length
        if (!flag) {
            console.log('valueArr', valueArr)
        }
    }

    const handleRemoveEmptyRow = () => {
        const newTextareaValue = fromatTextareaValue(textareaValue);
        setTextareaValue(newTextareaValue.filter(item => item).join('\n'));
    }

    const renderLeftContent = (item, index) => {
        return <>
            {
                item.formatError ? '格式' : item.repeatError ? '重复' : index + 1
            }
        </>
    }

    const isReplaceErrorBackground = useMemo(() => {
        return orderNumberArr?.some(item => item.formatError || item.repeatError)
    }, [])

    const handleErrorNum = (errorName) => {
        return orderNumberArr?.filter(item => item?.[errorName]?.length || undefined)
    }

    useEffect(() => {
        let indexArr = [];
        orderNumberArr.forEach((item, index) => {
            if (item.formatError || item.repeatError) {
                indexArr.push(index)
            }
        })
        contentRef.current.scrollTop = 20 * indexArr[0]
    }, [orderNumberArr])

    // useEffect(() => {
    //     const arr = [];
    //     for (let i = 0; i < 40; i++) {
    //         arr.push(Math.ceil(Math.random() * 1000000))
    //     }
    //     setTextareaValue(arr.join('\n'));
    // }, [])
    return <>
        <div className="edit-wapper">
            <ul id="leftNum" ref={leftRef} style={isReplaceErrorBackground ? { background: "#fcf2ee" } : {}}>
                {
                    orderNumberArr.map((item, index) => {
                        return <li key={index}>{renderLeftContent(item, index)}</li>
                    })
                }
            </ul>

            <textarea
                id="content"
                cols="30"
                rows="13"
                wrap='off'
                value={textareaValue}
                onChange={(e) => handleTextareaChange(e.target.value)}
                ref={contentRef}
                onScroll={(e) => {
                    leftRef.current.scrollTop = contentRef.current.scrollTop
                }}
                placeholder='输入或黏贴UID 到这，多个ID回车换行输入'
                style={isReplaceErrorBackground ? { background: "#fcf2ee" } : {}}
            />

            {handleErrorNum('formatError') ? `${handleErrorNum('formatError')}格式错误` : null}
            {handleErrorNum('repeatError') ? `${handleErrorNum('repeatError')}重复` : null}
        </div>
        <Button onClick={() => handleSumbitData()}>提交</Button>
    </>
}

export default EditTextArea


