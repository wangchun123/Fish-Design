import G6 from '@antv/g6';

// 绘制节点线条
const registerEdge = () =>
  G6.registerEdge('flow-line', {
    draw(cfg, group) {
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      const { style } = cfg;
      const shape = group.addShape('path', {
        attrs: {
          stroke: style.stroke,
          endArrow: style.endArrow,
          path: [
            // path这里是对三角形（也就是箭头的绘制）x
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

export default registerEdge;
