import React from 'react';
import { storiesOf } from '@storybook/react';
import EditableImage from '../EditableImage';
import {
  ContainerFluidDecorator,
  CenterMediumWidthDecorator
} from '../../../../../.storybook/util';
import { Avatar } from 'antd';

// Stories For SigninForm
storiesOf('Components/Avatar/EditableImage', module)
  .addDecorator(ContainerFluidDecorator)
  .addDecorator(CenterMediumWidthDecorator)
  .add('Default', () => (
    <EditableImage
      src="https://flop-images.s3-eu-west-1.amazonaws.com/flop.png"
      circle
    >
      {() => (
        <Avatar
          size={64}
          src={'https://flop-images.s3-eu-west-1.amazonaws.com/flop.png'}
        />
      )}
    </EditableImage>
  ))
  .add('With a large Size Editable', () => (
    <EditableImage
      editable
      src="https://flop-images.s3-eu-west-1.amazonaws.com/flop.png"
      size={150}
      circle
    >
      {() => (
        <Avatar
          size={150}
          src={'https://flop-images.s3-eu-west-1.amazonaws.com/flop.png'}
        />
      )}
    </EditableImage>
  ))
  .add('With Default Image Editable', () => (
    <EditableImage editable size={150}>
      {() => (
        <Avatar
          size={150}
          src={'https://flop-images.s3-eu-west-1.amazonaws.com/flop.png'}
        />
      )}
    </EditableImage>
  ));
