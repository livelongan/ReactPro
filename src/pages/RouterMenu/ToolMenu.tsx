import React, { useCallback, useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollapsed, setCollapsed } from '../../redux/ToolMenu/slice';
import Sider from 'antd/es/layout/Sider';
import styles from './ToolMenu.module.css'
import { MenuItemGroupType } from 'antd/es/menu/hooks/useItems';
import { useNavigate } from 'react-router-dom';
import routers from '../../router/routers';
import { RouteItem } from '../../router/type';
import ICON from '../../router/icons'

type MenuItem = Required<MenuProps>['items'][number] & {
  path?: string
  router?: RouteItem
};
interface IProp {
}
const COLLAPSED = 'collapsed'
const ToolMenu: React.FC<IProp> = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menus, setMenus] = useState<MenuItem[]>([])
  const [navigation] = useState<Map<string, MenuItem>>(new Map())
  const collapsed = useSelector(selectCollapsed)
  const [selectKeys, setSelectKeys] = useState<string[]>([])
  const [expand] = useState<MenuItem>({
    key: COLLAPSED,
    icon: collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />,
    label: 'Collapsed',
  })
  const [openKeys] = useState([''])
  const onMenuClick: MenuProps['onClick'] = (data) => {
    if (data.key === COLLAPSED) {
      dispatch(setCollapsed(!collapsed))
    }
  }
  const onMenuSelect: MenuProps['onSelect'] = (data) => {
    if (data.key !== COLLAPSED) {
      const has = selectKeys.findIndex((key) => key === data.key)
      if (has >= 0) {
        setSelectKeys([])
      } else {
        setSelectKeys([data.key])
      }
      const mapping = navigation.get(data.key)
      if (mapping) {
        navigate(mapping.path || '/')
      }
    }
  }
  const setRouterToMenu = useCallback((routerItems: RouteItem[], menus: MenuItem[] = [], parent?: MenuItem) => {
    routerItems.forEach((item) => {
      if (item.display === false) {
        return
      }
      const children = item.children || []
      const namePath = `${item.path}${item.name}`
      const key = !parent ? namePath : `${parent.key}/${namePath}`
      const menu = {
        key,
        icon: ICON[item.icon],
        children: null,
        label: item.title,
        router: item,
        path: item.path,
        type: undefined,
        style: {
          color: item.color
        },
      } as MenuItem
      navigation.set(key, menu)
      if (menu && children.length > 0) {
        const group = menu as MenuItemGroupType
        group.children = setRouterToMenu(children, [], menu)
      }
      menus.push(menu)
    })
    return menus
  }, [navigation])
  useEffect(() => {
    if (menus.length === 0) {
      const data = [expand]
      setRouterToMenu(routers as RouteItem[], data)
      setMenus(data)
    }
  }, [expand, menus.length, setRouterToMenu]);
  return (
    <ConfigProvider theme={{ token: { motion: false } }}>
      <Sider
        collapsible
        trigger={null}
        width={152}
        collapsedWidth={48}
        collapsed={collapsed}
        className={styles.sider}
      >
        <Menu
          className={styles.menu}
          selectedKeys={selectKeys}
          defaultOpenKeys={collapsed ? [] : openKeys}
          mode="inline"
          items={menus}
          onClick={onMenuClick}
          onSelect={onMenuSelect}
          multiple={false}
        />
      </Sider>
    </ConfigProvider>
  );
};
export default ToolMenu;