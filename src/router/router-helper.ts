/**
 * @description 路由辅助函数
 * @author clyan
 */

import type { RouterKey } from './models/enums'
import router from '.'

export class RouterHelper {
  navigate(path: RouterKey) {
    router.navigate(path)
  }
}
