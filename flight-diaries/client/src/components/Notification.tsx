interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps) => {
  const style = {
    color: 'red',
  };

  if (!props.message || props.message.length === 0) {
    return null;
  }

  return <p style={style}>{props.message}</p>;
};

export default Notification;
