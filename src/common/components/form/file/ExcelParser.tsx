import React from 'react';
import readXlsxFile from 'read-excel-file';
import { apply, compose, lift, splitAt, zipObj } from 'ramda';

type ExcelParserProps = {
  onDataUploaded: () => {};
  onError: () => {};
};

/**
 * Component which get Excel File and parse IT
 */
class ExcelParser extends React.Component<ExcelParserProps> {
  /**
   * Trigger on File Change
   */
  handleFile = (event: any) => {
    // Get The File from Input
    const file = event.target.files[0];
    // Get Keys From Props
    const keys = this.props.keys;
    const onDataUploaded = this.props.onDataUploaded;
    readXlsxFile(file).then(data => {
      // remove display headers
      data.shift();

      // add api headers
      data.unshift(keys);

      // convert arrays to objects
      const formatedResult = compose(
        apply(lift(zipObj)),
        splitAt(1)
      )(data);

      // send result to state
      onDataUploaded(formatedResult);
    });
  };

  render() {
    return this.props.render(this.handleFile);
  }
}

export default ExcelParser;
