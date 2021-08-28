export const calculationChildNum = (data: Record<string, any>) => {
  if (!data?.children?.length) return;

  [data].forEach(item => {
    item.sonNodeNum = item?.children?.length;
    if (item?.children?.length) {
      item?.children?.forEach((childrenItem: Record<string, any>) => {
        childrenItem.sonNodeNum = childrenItem?.children?.length;
        calculationChildNum(childrenItem);
      });
    }
  });
};
