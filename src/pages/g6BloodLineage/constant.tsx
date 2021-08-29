export const listObj = {
  id: 'A',
  label: 'root',
  name: '张三',
  children: [
    {
      id: 'c1',
      label: 'c1',
      name: '李四',
      children: [
        {
          id: 'c1-1',
          label: '李五你好吗我还好啊你好不',
          name: '李五',
          side: 'left',
          children: [
            {
              id: 'c1-1-1',
              label: 'c1-1-1',
              name: '白龙马',
            },
            {
              id: 'c1-1-2',
              label: 'c1-1-2',
              name: '唐三藏',
              children: [
                {
                  id: 'c1-1-1-1',
                  label: 'c1-1-1-1',
                  name: '沙悟净',
                },
                {
                  id: 'c1-1-1-2',
                  label: 'c1-1-1-2',
                  name: '孙悟空',
                },
              ],
            },
          ],
        },
        {
          id: 'c1-2',
          label: 'c1-2',
          name: '五六',
          children: [
            {
              id: 'c1-2-1',
              label: 'c1-2-1',
              name: '六七',
            },
            {
              id: 'c1-2-2',
              label: 'c1-2-2',
              name: '七八',
            },
          ],
        },
      ],
    },
    {
      id: 'c2',
      label: 'c2',
      name: '七八',
      side: 'left',
    },
    {
      id: 'c3',
      label: 'c3',
      name: '七八',
      side: 'right',
      children: [
        {
          id: 'c3-1',
          label: 'c3-1',
          name: '七八',
        },
        {
          id: 'c3-2',
          label: 'c3-2',
          name: '七八',
          children: [
            {
              id: 'c3-2-1',
              label: 'c3-2-1',
              name: '七八',
            },
            {
              id: 'c3-2-2',
              label: 'c3-2-2',
              name: '七八',
            },
            {
              id: 'c3-2-3',
              label: 'c3-2-3',
              name: '七八',
            },
          ],
        },
        {
          id: 'c3-3',
          label: 'c3-3',
          name: '七八',
        },
      ],
    },
  ],
};
