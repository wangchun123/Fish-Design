import React, { useEffect, useState } from 'react';
// 引入G6
import G6 from '@antv/g6';
// 引入antv的样式
import insertCss from 'insert-css';
const GsixManage = (props) => {
    const listObj = {
        id: 'A',
        label: 'root',
        name: "张三",
        children: [
            {
                id: 'c1',
                label: 'c1',
                name: "李四",
                children: [
                    {
                        id: 'c1-1',
                        label: 'c1-1',
                        name: "李五",
                        children: [
                            {
                                id: "c1-1-1",
                                label: "c1-1-1",
                                name: "白龙马",
                            },
                            {
                                id: "c1-1-2",
                                label: "c1-1-2",
                                name: "唐三藏",
                                children: [
                                    {
                                        id: "c1-1-1-1",
                                        label: "c1-1-1-1",
                                        name: "沙悟净",
                                    },
                                    {
                                        id: "c1-1-1-2",
                                        label: "c1-1-1-2",
                                        name: "孙悟空",
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        id: 'c1-2',
                        label: 'c1-2',
                        name: "五六",
                        children: [
                            {
                                id: 'c1-2-1',
                                label: 'c1-2-1',
                                name: "六七",
                            },
                            {
                                id: 'c1-2-2',
                                label: 'c1-2-2',
                                name: "七八",
                            },
                        ],
                    },
                ],
            },
            {
                id: 'c2',
                label: 'c2',
                name: "七八",
            },
            {
                id: 'c3',
                label: 'c3',
                name: "七八",
                children: [
                    {
                        id: 'c3-1',
                        label: 'c3-1',
                        name: "七八",
                    },
                    {
                        id: 'c3-2',
                        label: 'c3-2',
                        name: "七八",
                        children: [
                            {
                                id: 'c3-2-1',
                                label: 'c3-2-1',
                                name: "七八",
                            },
                            {
                                id: 'c3-2-2',
                                label: 'c3-2-2',
                                name: "七八",
                            },
                            {
                                id: 'c3-2-3',
                                label: 'c3-2-3',
                                name: "七八",
                            },
                        ],
                    },
                    {
                        id: 'c3-3',
                        label: 'c3-3',
                        name: "七八",
                    },
                ],
            },
        ],
    };
    const [data, setData] = useState(listObj);
    const gSixCom = (data) => {
        insertCss(`
        .g6-tooltip {
          border: 1px solid #e2e2e2;
          border-radius: 4px;
          font-size: 12px;
          color: #000;
          background-color: rgba(255, 255, 255, 0.9);
          padding: 10px 8px;
          box-shadow: rgb(174, 174, 174) 0px 0px 10px;
          position: absolute;
          top: 30px;
        }
      `);
        // 绘制背景表格的插件
        const grid = new G6.Grid();
        // 这里是绘制节点的地方
        G6.registerNode(
            'icon-node',
            {
                options: {
                    size: [60, 20],
                    stroke: '#91d5ff',
                    fill: '#91d5ff',
                },
                drawShape(cfg, group) {
                    const styles = this.getShapeStyle(cfg);
                    const w = styles.width;
                    const h = styles.height;
                    const keyShape = group.addShape('rect', {
                        attrs: {
                            x: -w / 2,
                            y: -h / 2,
                            width: w,
                            height: h,
                            stroke: "#5B8FF9",
                            fill: "#fff",
                            radius: [2, 2, 0, 0],
                            textAlign: "left",
                        },
                        name: 'box',
                    });
                    group.addShape('text', {
                        attrs: {
                            x: -w / 2.4,
                            y: h / 2,
                            width: w,
                            height: h,
                            fill: "green",
                            text: `联系人：${cfg.label}\ 
电话：${cfg.category === 0 ? "公司" : "部门"}\
                        
简码：${cfg.isOpen === 0 ? "禁用" : "启用"}
                        `,
                            radius: [2, 2, 0, 0],
                            textAlign: "left",
                        },
                        name: 'header-box',
                        zIndex: 10,
                    });
                    if (cfg.name) {
                        // title的背景设置
                        group.addShape('rect', {
                            attrs: {
                                x: -w / 2,
                                y: -h / 2,
                                width: w,
                                height: h / 3,
                                fill: "#5B8FF9",
                                radius: [2, 2, 0, 0],
                                textAlign: "center",
                            },
                            name: 'title-box',
                            draggable: true,
                        });
                        // 头部标题
                        // 图标的展示
                        // 有children才会显示这个图标
                        group.addShape('text', {
                            attrs: {
                                textBaseline: 'top',
                                // x: -w / 6,
                                y: -h / 2.5,
                                width: w,
                                height: h / 3,
                                lineHeight: 20,
                                textAlign: "center",
                                text: cfg.label,
                                fill: '#fff',
                            },
                            name: 'title',
                        });
                        // 图标的展示
                        console.log(cfg.children);
                        cfg.children &&
                            group.addShape('marker', {
                                attrs: {
                                    x: 1,
                                    y: 45,
                                    r: 8,
                                    cursor: 'pointer',
                                    // 就是设置折叠展开的样式，但是必须要设置stroke颜色，
                                    // 否则 效果就是透明，误以为会没生效，当然x,y,r的定位也很重要
                                    symbol: JSON.stringify(cfg.children) === "[]" ? G6.Marker.expand : G6.Marker.collapse,
                                    stroke: '#666',
                                    lineWidth: 1,
                                    fill: '#fff',
                                },
                                name: 'collapse-icon',
                                modelId: cfg.id
                            });
                    }
                    return keyShape;
                },
                update: undefined,
                // 设置点击折叠以后显示的图标，这个setState尽量避免使用，因为我在里面的
                // 控制台输出发现这个数据一会儿一输出，像是使用了定时器一样。又似是监听
                setState(name, value, item) {
                    console.log(name, value, item);
                    const group = item.getContainer();
                    if (name === 'collapsed') {
                        const marker = item.get('group').find((ele) => ele.get('name') === 'collapse-icon');
                        let icon;
                        if(value === undefined){
                            icon = G6.Marker.expand;
                        } else {
                            icon = G6.Marker.collapse;
                        }
                        marker.attr('symbol', icon);
                    }
                    
                },
            },
            'rect',
        );
        // 绘制节点线条
        G6.registerEdge('flow-line', {
            draw(cfg, group) {
                const startPoint = cfg.startPoint;
                const endPoint = cfg.endPoint;
                const { style } = cfg;
                const shape = group.addShape('path', {
                    attrs: {
                        stroke: style.stroke,
                        endArrow: style.endArrow,
                        path: [ // path这里是对三角形（也就是箭头的绘制）x
                            ['M', startPoint.x, startPoint.y],
                            ['L', startPoint.x, (startPoint.y + endPoint.y) / 2],
                            ['L', endPoint.x, (startPoint.y + endPoint.y) / 2],
                            ['L', endPoint.x, endPoint.y],
                        ],
                    },
                });
                return shape;
            },
        });
        const defaultStateStyles = {
            hover: {
                stroke: '#1890ff',
                lineWidth: 2,
            },
        };
        const defaultNodeStyle = {
            // fill: '#fff',
            fill: "red", // 背景颜色
            stroke: '#5B8FF9', // 边框
            radius: 2,
        };
        // 节点之间连线的样式
        const defaultEdgeStyle = {
            stroke: '#5B8FF9',
        };
        const defaultLayout = {
            type: 'compactBox',
            direction: 'TB', // TB 是从上到下的展示节点
            // 这个是不能去掉的，否则展开与折叠就不生效了。
            getId: function getId(d) {
                return d.id;
            },
            getHeight: function getHeight() { // 节点之间高度的距离
                return 45;
            },
            getWidth: function getWidth() { // 节点之间宽度的距离
                return 16;
            },
            getVGap: function getVGap() {
                return 40;
            },
            getHGap: function getHGap() {
                return 70;
            },
        };
        const defaultLabelCfg = { // 这个就是节点中间的字体颜色，因为都是绘制出来的所以我暂时先#fff相当于隐藏了
            style: {
                fill: 'rgb(0,0,0,0)',
                fontSize: 12,
            },
        };
        const width = document.getElementById(`container`).scrollWidth;
        const height = document.getElementById(`container`).scrollHeight || 600;
        let graph = new G6.TreeGraph({
            container: `container`,
            width,
            height,
            linkCenter: true,
            defaultLevel: 2,
            modes: {
                default: [
                    'drag-canvas',
                    // 这个是鼠标移入到节点，而显示的数据
                    {
                        type: 'tooltip',
                        formatText: function formatText(model) {
                            return model.name;
                        },
                        offset: 30,
                        style: {
                            stroke: "#DEE9FF"
                        },
                    },
                    'zoom-canvas',
                ],
            },
            // 内置节点
            defaultNode: {
                type: 'icon-node',
                size: [130, 90], // 设置节点的宽和高
                style: defaultNodeStyle,
                labelCfg: defaultLabelCfg,
            },
            defaultEdge: {
                type: 'flow-line',
                style: defaultEdgeStyle,
            },
            nodeStateStyles: defaultStateStyles,
            edgeStateStyles: defaultStateStyles,
            layout: defaultLayout,
            plugins: [grid],
            defaultLevel: 2,
            nodeClick: (item) => {
                console.log(item);
            }
        });
        let listAA = JSON.parse(JSON.stringify(data));
        const loop = (data) => {
            data.forEach(item => {
                if (item.id.length >= 2) {
                    if (item.children) {
                        item = graph.findDataById(item.id, listAA).children = [];
                    }
                }
                if (item.children) {
                    loop(item.children);
                }
            })
            return data;
        }
        loop([listAA]);
        graph.setAutoPaint(true);
        graph.read(listAA);
        graph.render();
        graph.fitCenter(true);
        graph.zoom(0.8); // 默认缩放图形大小
        graph.on('node:mouseenter', (evt) => {
            const { item } = evt;
            graph.setItemState(item, 'hover', true);
        });
        graph.on('node:mouseleave', (evt) => {
            const { item } = evt;
            graph.setItemState(item, 'hover', false);
        });
        let cloneData = JSON.parse(JSON.stringify(data));
        graph.on('node:click', (evt) => {
            const { target, item } = evt;
            const id = target.get('modelId');
            const item22 = graph.findById(id);
            console.log(item22, id);
            const nodeModel = item22 && item22.getModel();
            const name = target.get('name');
            if (name === 'collapse-icon') {
                let gsixAa = graph.findDataById(id, JSON.parse(JSON.stringify(cloneData)));
                console.log(JSON.stringify(nodeModel.children));
                if (JSON.stringify(nodeModel.children) !== "[]") {
                    gsixAa && gsixAa.children.forEach(item => {
                        nodeModel.children = nodeModel.children ? [] : null;
                    })
                    let gsixModel = JSON.parse(JSON.stringify(nodeModel));
                    graph.updateChild(gsixModel, gsixModel.id);
                    graph.setItemState(item22, 'collapsed', nodeModel.collapsed);
                } else {
                    if (!nodeModel.children) {
                        nodeModel.children = [];
                    }
                    console.log(nodeModel);
                    gsixAa && gsixAa.children.forEach(item => {
                        nodeModel.children.push(item);
                    })
                    let gsixModel = nodeModel;
                    gsixModel.children.forEach((element, index) => {
                        if (element.children) {
                            element.children = element.children ? [] : null;
                        }
                    })
                    graph.updateChild(gsixModel, gsixModel.id);
                    graph.setItemState(item22, 'collapsed', !nodeModel.collapsed);
                }
            }
        });
    }
    useEffect(() => {
        document.getElementById(`container`).innerHTML = "";
        gSixCom(data);
    }, [])
    return <>
        <div>
            1111111
            <div id={`container`}></div>
        </div>
    </>
}
export default GsixManage;
