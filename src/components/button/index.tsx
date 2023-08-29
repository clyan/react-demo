/**
 * @description 按钮组件
 * @author 颜文耀
 */

/** 按钮组件样式 */
export interface ButtonProps {
  /** 大小 */
  size?: 'small' | 'middle' | 'large'
  /** 类型 */
  type?: 'primary' | 'dange'
}

/**
 * 按钮组件
 * @visibleName Button按钮组件
 */
export default function Button(props: ButtonProps) {
  const { size } = props

  return <div style={{ width: size === 'small' ? 12 : 14 }}> 按钮 </div>
}
