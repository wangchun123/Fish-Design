import G6 from '@antv/g6';

// 这里是绘制节点的地方
const registerNode = () =>
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
            stroke: '#5B8FF9',
            fill: '#fff',
            radius: [2, 2, 0, 0],
            textAlign: 'left',
          },
          name: 'box',
        });
        group.addShape('text', {
          attrs: {
            x: -w / 2.4,
            y: h / 2,
            width: w,
            height: h,
            fill: 'green',
            text: `联系人：${cfg.label}\ 
电话：${cfg.category === 0 ? '公司' : '部门'}\
                      
简码：${cfg.isOpen === 0 ? '禁用' : '启用'}
                      `,
            radius: [2, 2, 0, 0],
            textAlign: 'left',
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
              fill: '#5B8FF9',
              radius: [2, 2, 0, 0],
              textAlign: 'center',
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
              textAlign: 'center',
              text: cfg.label,
              fill: '#fff',
            },
            name: 'title',
          });
          // 图标的展示
          cfg.children &&
            group.addShape('marker', {
              attrs: {
                x: 1,
                y: 45,
                r: 8,
                cursor: 'pointer',
                // 就是设置折叠展开的样式，但是必须要设置stroke颜色，
                // 否则 效果就是透明，误以为会没生效，当然x,y,r的定位也很重要
                symbol:
                  JSON.stringify(cfg.children) === '[]'
                    ? G6.Marker.expand
                    : G6.Marker.collapse,
                stroke: '#666',
                lineWidth: 1,
                fill: '#fff',
              },
              name: 'collapse-icon',
              modelId: cfg.id,
            });
        }
        return keyShape;
      },
      update: undefined,
      // 设置点击折叠以后显示的图标，这个setState尽量避免使用，因为我在里面的
      // 控制台输出发现这个数据一会儿一输出，像是使用了定时器一样。又似是监听
      setState(name, value, item) {
        const group = item.getContainer();
        if (name === 'collapsed') {
          const marker = item
            .get('group')
            .find(ele => ele.get('name') === 'collapse-icon');
          let icon;
          if (value === undefined) {
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

export default registerNode;
