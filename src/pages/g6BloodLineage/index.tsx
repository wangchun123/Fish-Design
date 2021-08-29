import React, { useEffect, useRef } from 'react';
import G6 from '@antv/g6';
import { listObj } from './constant';
import { calculationChildNum } from './util/index';

const minWidth = 60;

const BaseConfig = {
  nameFontSize: 12,
  childCountWidth: 22,
  itemPadding: 16,
  nameMarginLeft: 4,
  rootPadding: 18,
};

const backGroundColor = {
  type1: 'red',
  type2: 'yellow',
  type3: 'yellowgreen',
  type4: 'green',
};

calculationChildNum(listObj);

G6.registerNode('treeNode', {
  draw: (cfg, group) => {
    const { label, collapsed, sonNodeNum = 0, customType } = cfg;

    console.log('cfg', cfg);

    const {
      childCountWidth,
      itemPadding,
      nameMarginLeft,
      rootPadding,
    } = BaseConfig;

    let width = 0;
    const height = 40;
    const x = 0;
    const y = -height / 2;

    // 名称文本
    const text = group.addShape('text', {
      attrs: {
        text: label,
        x: x * 2,
        y,
        textAlign: 'left',
        textBaseline: 'top',
        fontFamily: 'PingFangSC-Regular',
      },
      cursor: 'pointer',
      name: 'name-text-shape',
    });
    const textWidth = text.getBBox().width;
    width = textWidth + itemPadding + nameMarginLeft;

    width = width < minWidth ? minWidth : width;

    const keyShapeAttrs = {
      x,
      y,
      width: width + 50,
      height,
      radius: 4,
      fill: backGroundColor[customType],
      stroke: backGroundColor[customType],
      cursor: 'pointer',
    };

    const keyShape = group.addShape('rect', {
      attrs: keyShapeAttrs,
      name: 'root-key-shape-rect-shape',
    });

    const mainX = x - 10;
    const mainY = -height + 15;

    let nameColor = 'rgba(0, 0, 0, .65)';

    // 名称
    group.addShape('text', {
      attrs: {
        text: label,
        x: mainX + rootPadding,
        y: 1,
        textAlign: 'left',
        textBaseline: 'middle',
        fill: nameColor,
        fontSize: 12,
        fontFamily: 'PingFangSC-Regular',
        cursor: 'pointer',
      },
      name: 'root-text-shape',
    });

    // 子类数量

    const childCountHeight = 12;
    const childCountX = width - childCountWidth;
    const childCountY = -childCountHeight / 2;

    group.addShape('rect', {
      attrs: {
        width: childCountWidth,
        height: 20,
        stroke: collapsed ? '#1890ff' : '#5CDBD3',
        fill: collapsed ? '#fff' : '#E6FFFB',
        x: childCountX + 48,
        y: childCountY - 3,
        radius: 10,
        cursor: 'pointer',
      },
      name: 'child-count-rect-shape',
    });
    group.addShape('text', {
      attrs: {
        text: `${sonNodeNum}`,
        fill: 'rgba(0, 0, 0, .65)',
        x: childCountX + childCountWidth / 2 + 48,
        y: childCountY + 12,
        fontSize: 10,
        width: childCountWidth,
        textAlign: 'center',
        cursor: 'pointer',
      },
      name: 'child-count-text-shape',
    });

    return keyShape;
  },
});

const tooltip = new G6.Tooltip({
  offsetX: 10,
  offsetY: 20,
  getContent(e) {
    const outDiv = document.createElement('div');
    outDiv.style.width = '180px';
    outDiv.innerHTML = `
        <h4>自定义tooltip</h4>
        <div>
          <div>Label: ${e.item.getModel().label || e.item.getModel().id}</div>
        </div>`;
    return outDiv;
  },
  itemTypes: ['node'],
  trigger: 'click',
  shouldBegin: evt => {
    const { target, item } = evt;
    const name = target.get('name');
    if (name === 'child-count-text-shape' || name === 'child-count-rect-shape')
      return false;

    return true;
  },
});

const width = 800;
const height = 500;

const G6BloodLineage = () => {
  const warpRef = useRef(null);

  useEffect(() => {
    const graph = new G6.TreeGraph({
      container: warpRef.current,
      width,
      height,
      modes: {
        default: ['drag-canvas', 'zoom-canvas'],
      },
      plugins: [tooltip],
      defaultNode: {
        type: 'treeNode',
        anchorPoints: [
          [0, 0.5],
          [1, 0.5],
        ],
      },
      defaultEdge: {
        type: 'cubic-horizontal',
      },
      layout: {
        type: 'compactBox',
        direction: 'H',
        getSide: d => d?.data?.side,
        getId: function getId(d) {
          return d.id;
        },
        getHeight: function getHeight() {
          return 16;
        },
        getWidth: function getWidth(d) {
          const labelWidth = G6.Util.getTextSize(
            d.label,
            BaseConfig.nameFontSize,
          )[0];
          const width =
            BaseConfig.itemPadding +
            BaseConfig.nameMarginLeft +
            labelWidth +
            BaseConfig.rootPadding +
            BaseConfig.childCountWidth;
          return width;
        },
        getVGap: function getVGap() {
          return 15;
        },
        getHGap: function getHGap() {
          return 30;
        },
      },
    });

    let newData = JSON.parse(JSON.stringify(listObj));

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

    graph.data(newData);
    graph.render();
    graph.fitCenter(true);
    graph.zoom(1); // 默认缩放图形大小

    const cloneData = JSON.parse(JSON.stringify(listObj));

    graph.on('node:click', evt => {
      const { target, item } = evt;
      const nodeModel = item?.getModel();
      const { id } = nodeModel;
      const name = target.get('name');

      const gsixAa = graph.findDataById(id, cloneData);

      console.log('name', name);

      if (
        name === 'child-count-text-shape' ||
        name === 'child-count-rect-shape'
      ) {
        if (nodeModel?.children?.length) {
          nodeModel.children = [];
          graph.updateChild(nodeModel, id);
        } else {
          gsixAa?.children?.forEach(item => {
            nodeModel.children?.push({ ...item, children: [] });
          });
          graph.updateChild(nodeModel, id);
        }
      }
    });
  }, []);
  return <div ref={warpRef}></div>;
};

export default G6BloodLineage;
