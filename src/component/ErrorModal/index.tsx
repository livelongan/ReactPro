import React, { useEffect, useState } from 'react';
import { Button, Modal, Result } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorCatch, setErrorCatch } from '../../redux/App/slice';
import { isRouteErrorResponse } from 'react-router-dom';
import { FallbackProps } from 'react-error-boundary';
const ErrorModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const errorCatch = useSelector(selectErrorCatch)
  const [title, setTitle] = useState('Something went wrong');
  const [error, setError] = useState<FallbackProps['error']>('');
  useEffect(() => {
    if (isRouteErrorResponse(errorCatch)) {
      setTitle(errorCatch.data)
      setOpen(true)
    }
  }, [errorCatch])
  // useEffect(() => {
  //   if (prop && prop.error) {
  //     setError(prop.error)
  //   }
  // }, [prop])
  return (
    <Modal
      title="Error Boundary"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={<></>}
      width={500}
      afterOpenChange={() => {
        dispatch(setErrorCatch(null))
      }}
    >
      {!error ? <Result
        status="error"
        title={title}
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary" onClick={() => setOpen(false)}>Close</Button>}
      /> : error}
    </Modal>
  );
};

export default ErrorModal;