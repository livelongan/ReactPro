
export interface RouteItem {
  name: string
  title: string
  path: string
  icon: string
  children?: RouteItem[],
  display?: boolean
  color?: string
}