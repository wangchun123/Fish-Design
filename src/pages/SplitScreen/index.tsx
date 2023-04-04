import React, { useRef, useEffect, useState } from 'react';
import { SplitScreen } from '@/components';
import './index.less';

const Demo = () => {
  const topContent = new Array(20000).fill('top\n');
  const bottomContent = new Array(20000).fill('bottom\n');

  return (
    <>
      <SplitScreen topContent={topContent} bottomContent={bottomContent} />
    </>
  );
};

export default Demo;
