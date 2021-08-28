import G6 from '@antv/g6';

const tooltip = () =>
  new G6.Tooltip({
    offsetX: 10,
    offsetY: 10,
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node', 'edge'],
    // 自定义 tooltip 内容
    getContent: e => {
      const outDiv = document.createElement('div');
      outDiv.style.width = 'fit-content';
      //outDiv.style.padding = '0px 0px 20px 0px';
      outDiv.innerHTML = `
              <h4>Custom Content</h4>
              <div>
                <div>Type: ${e.item.getType()}</div>
              </div>
              <div>
                <div>Label: ${e.item.getModel().label ||
                  e.item.getModel().id}</div>
              </div>`;
      return outDiv;
    },
  });

export default tooltip;
