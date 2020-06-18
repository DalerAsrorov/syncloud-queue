import React from 'react';
import { Container, Responsive as SemanticResponsive } from 'semantic-ui-react';

export interface AppResponsiveProps {}

export interface AppResponsiveState {
  width: number;
}

export class AppResponsive extends React.PureComponent<
  AppResponsiveProps,
  AppResponsiveState
> {
  handleOnUpdate = (_e: any, { width }: { width: number }) =>
    this.setState({ width });

  render() {
    return (
      <SemanticResponsive
        as={Container}
        fireOnMount
        onUpdate={this.handleOnUpdate}
      >
        {typeof this.props.children === 'function'
          ? this.props.children(this.state)
          : null}
      </SemanticResponsive>
    );
  }
}
