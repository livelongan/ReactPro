import { HomeOutlined, NumberOutlined, CalculatorOutlined, SettingOutlined, UserOutlined, FormOutlined, TrophyOutlined, TableOutlined } from "@ant-design/icons";
import { ReactNode } from "react";
const icons: { [property: string]: ReactNode } = {
    home: <HomeOutlined />,
    gann: <NumberOutlined />,
    calc: <CalculatorOutlined />,
    form: <FormOutlined />,
    organization:<TrophyOutlined />,
    
    settings: <SettingOutlined />,
    userProfile: <UserOutlined />,
    purple: <TableOutlined />
}
export default icons