import { Component } from 'react';
import DebugConfig from '../../config/DebugConfig';

type RenderCountProps = {
  componentName: string;
};

/**
 * Component in order to calculate the number of rerender component
 */
class RenderCount extends Component<RenderCountProps> {
  /**
   * Constructor
   */
  constructor(props: RenderCountProps) {
    super(props);
    this.count = 1;
  }

  /**
   * Increment Render Component on Will Update
   */
  componentWillUpdate() {
    this.count = this.count + 1;
  }

  /**
   * Render Method
   */
  render() {
    if (DebugConfig.performanceLogger) {
      console.log(`Render ${this.props.componentName} : ${this.count}`);
    }
    return null;
  }
}

export default RenderCount;
