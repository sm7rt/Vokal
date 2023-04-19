import React, { useState } from 'react';
import { Row, Icon } from 'antd';

type EditableImageProps = {
  size?: number;
  src?: string;
  editable?: boolean;
  circle?: boolean;
  shouldShowOverlay?: boolean;
};
const EditableImage = ({
  editable = false,
  size = 64,
  src,
  circle,
  children,
  shouldShowOverlay
}: EditableImageProps) => {
  const [showOverlay, setShowOverlay] = useState(shouldShowOverlay);

  return (
    <div
      onMouseEnter={() => editable && setShowOverlay(true)}
      onMouseLeave={() => editable && setShowOverlay(false)}
      className="position-relative"
    >
      {children({ src, size })}
      {showOverlay && (
        <Row
          type="flex"
          justify="center"
          align="middle"
          className="position-absolute h-100 w-100 d-flex"
          style={{
            top: 0,
            left: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            borderRadius: circle ? '50%' : '0'
          }}
          onClick={() => {}}
        >
          <Icon
            type={src ? 'edit' : 'plus'}
            className="text-white"
            style={{ fontSize: 40 }}
          />
        </Row>
      )}
    </div>
  );
};

export default React.memo(EditableImage);
