import { Col, Icon, message, Row, Upload } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import React, { Fragment } from 'react';

type AntdFileUploadFieldProps = {
  previewWidth: string;
  previewHeight: string;
};

/**
 * Get Base64 for Image
 */
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

/**
 * Validation Before Upload
 * @param file
 */
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  if (!isJPG && !isPNG) {
    message.error('You can only upload JPG or PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  // Return false for manually upload
  return false;
}

class AntdFileUploadField extends React.Component<AntdFileUploadFieldProps> {
  handleChange = info => {
    // Get this url from response in real world.
    getBase64(info.file, imageUrl => {
      console.log(info);
      this.props.input.onChange({
        file: info.file,
        imageUrl
      });
    });
  };

  render() {
    const { meta, label, className, accept } = this.props;
    const hasError = meta.touched && meta.invalid;
    return (
      <FormItem
        label={label}
        validateStatus={hasError ? 'error' : 'success'}
        help={hasError && meta.error}
        className={className}
      >
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          disabled={this.props.disabled}
          accept={accept}
        >
          {this.props.children(this.props)}
        </Upload>
      </FormItem>
    );
  }
}

AntdFileUploadField.defaultProps = {
  previewWidth: '104px',
  previewHeight: '104px',
  children: props => (
    <Fragment>
      {props.input.value && props.input.value.imageUrl ? (
        <img
          width={props.previewWidth}
          height={props.previewHeight}
          src={props.input.value.imageUrl}
          alt="avatar"
        />
      ) : (
        <Row
          type="flex"
          align="middle"
          justify="center"
          style={{ width: props.previewWidth, height: props.previewHeight }}
        >
          <Col>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
          </Col>
        </Row>
      )}
    </Fragment>
  )
};

export default AntdFileUploadField;
