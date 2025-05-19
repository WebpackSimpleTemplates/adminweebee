'use client'

import type { ReactNode } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";

type Btn = {
  label: ReactNode,
  isActive: boolean,
  key?: string | number,
  page?: number | null,
};

function align(start: number, num: number, end: number) {
  return Math.max(start, Math.min(num, end));
}

export function getButtons(page: number, optionsCount: number, total: number) {
  const length = optionsCount * 2 + 1;

  if (total < length) {
    return [
      {
        key: 'prev',
        page: page > 0 ? page - 1 : null,
        isActive: false,
        label: <BiArrowToLeft />
      },
      ...new Array(total).fill(null).map((_, id) => ({
        key: id,
        page: id,
        isActive: id === page,
        label: <>{id + 1}</>
      }) as Btn),
      {
        key: page,
        page: page < total - 1 ? page + 1 : null,
        isActive: false,
        label: <BiArrowToRight />
      },
    ];
  }

  const optionsStartPageIndex = align(2, page - optionsCount, total - length - 2);
  const optionsEndPageIndex = optionsStartPageIndex + Math.min(length, total - 4);

  return [
    {
      key: 'prev',
      page: page > 0 ? page - 1 : null,
      isActive: false,
      label: <BiArrowToLeft />
    },
    {
      key: 'first',
      page: 0,
      label: <>1</>,
      isActive: page === 0,
    },
    optionsStartPageIndex > 2 ? {
      key: '...0',
      label: <>...</>,
      isActive: false,
    } : {
      key: 'second',
      page: 1,
      label: <>2</>,
      isActive: page === 1,
    },
    ...new Array(optionsEndPageIndex - optionsStartPageIndex).fill(null).map((_, id) => id + optionsStartPageIndex).map((id) => ({
      key: id,
      page: id,
      isActive: id === page,
      label: <>{id + 1}</>
    })),
    optionsEndPageIndex < total - 2 ? {
      key: '...1',
      label: <>...</>,
      isActive: false,
    } : {
      label: <>{optionsEndPageIndex + 1}</>,
      isActive: page === optionsEndPageIndex,
      page: optionsEndPageIndex,
      key: 'pre-last',
    },
    {
      key: 'last',
      page: total - 1,
      label: <>{total}</>,
      isActive: page === total - 1,
    },
    {
      key: 'next',
      page: page < total - 1 ? page + 1 : null,
      isActive: false,
      label: <BiArrowToRight />
    },
  ].filter((item) => !!item).map((item) => item as Btn);
}