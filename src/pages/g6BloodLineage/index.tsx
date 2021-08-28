import React, { useEffect, useState } from 'react';
import G6 from '@antv/g6';
import { listObj } from './constant';
import tooltip from './util/toolTips';
import registerNode from './util/registerNode';
import registerEdge from './util/registerEdge';

const G6Tree = () => {
  const [data, setData] = useState(listObj);

  const initG6 = (data: Record<string, any>) => {
    registerNode();
    registerEdge();

    const width = document?.getElementById(`container`)?.scrollWidth;
    const height = document?.getElementById(`container`)?.scrollHeight || 600;

    const graph = new G6.TreeGraph({
      container: `container`,
      width,
      height,
      linkCenter: true,
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
      // tooltips 插件
      plugins: [tooltip()],
    });

    let newData = JSON.parse(JSON.stringify(data));

    const getFirstFloorData = (data: Record<string, any>[]) => {
      data.forEach(item => {
        if (item.id.length >= 2) {
          if (item.children) {
            item = graph.findDataById(item.id, newData).children = [];
          }
        }
        if (item.children) {
          getFirstFloorData(item.children);
        }
      });
      return data;
    };

    getFirstFloorData([newData]);

    graph.setAutoPaint(true);
    graph.read(newData);
    graph.render();
    graph.fitCenter(true);
    graph.zoom(0.8); // 默认缩放图形大小

    graph.on('node:mouseenter', evt => {
      const { item } = evt;
      graph.setItemState(item, 'hover', true);
    });

    graph.on('node:mouseleave', evt => {
      const { item } = evt;
      graph.setItemState(item, 'hover', false);
    });

    let cloneData = JSON.parse(JSON.stringify(data));

    graph.on('node:click', evt => {
      const { target, item } = evt;

      console.log('evt',evt);

      const id = target.get('modelId');
      
      const item22 = graph.findById(id);

      const nodeModel = item22 && item22.getModel();

      const name = target.get('name');
      
      if (name === 'collapse-icon') {
        let gsixAa = graph.findDataById(
          id,
          JSON.parse(JSON.stringify(cloneData)),
        );

        if (JSON.stringify(nodeModel.children) !== '[]') {

          gsixAa &&
            gsixAa.children.forEach(item => {
              nodeModel.children = nodeModel.children ? [] : null;
            });
          let gsixModel = JSON.parse(JSON.stringify(nodeModel));
          graph.updateChild(gsixModel, gsixModel.id);
          graph.setItemState(item22, 'collapsed', nodeModel.collapsed);

        } else {
            
          if (!nodeModel.children) {
            nodeModel.children = [];
          }
          gsixAa &&
            gsixAa.children.forEach(item => {
              nodeModel.children.push(item);
            });
          let gsixModel = nodeModel;
          gsixModel.children.forEach((element, index) => {
            if (element.children) {
              element.children = element.children ? [] : null;
            }
          });
          graph.updateChild(gsixModel, gsixModel.id);
          graph.setItemState(item22, 'collapsed', !nodeModel.collapsed);
        }
      }
    });
  };

  useEffect(() => {
    initG6(data);
  }, []);

  return (
    <>
      <div id={`container`} />
    </>
  );
};

export default G6Tree;

const defaultStateStyles = {
  hover: {
    stroke: '#1890ff',
    lineWidth: 2,
  },
};

const defaultNodeStyle = {
  // fill: '#fff',
  fill: 'red', // 背景颜色
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
  getHeight: function getHeight() {
    // 节点之间高度的距离
    return 45;
  },
  getWidth: function getWidth() {
    // 节点之间宽度的距离
    return 16;
  },
  getVGap: function getVGap() {
    return 40;
  },
  getHGap: function getHGap() {
    return 70;
  },
};
const defaultLabelCfg = {
  // 这个就是节点中间的字体颜色，因为都是绘制出来的所以我暂时先#fff相当于隐藏了
  style: {
    fill: 'rgb(0,0,0,0)',
    fontSize: 12,
  },
};
