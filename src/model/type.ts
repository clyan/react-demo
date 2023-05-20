/**
 * @description Typescript 拓展类型
 * @author clyan
 */

import type { CSSProperties } from 'react'

export type PropsWithStyle<P = unknown> = P & { style?: CSSProperties }

export type PropsWithClassName<P = unknown> = P & { className?: string }

export type PropsWithStyleAndClassName<P = unknown> = P & PropsWithStyle & PropsWithClassName
