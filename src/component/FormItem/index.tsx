import React from 'react';
import { Form, FormItemProps } from 'antd';
// import styles from './Calc.module.css'

const FormItem: React.FC<FormItemProps> = (props) => {
    return (<Form.Item {...props}/>)
};
export default FormItem;