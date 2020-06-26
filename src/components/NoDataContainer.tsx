import React from 'react';
import {
  Container,
  Header,
  Icon,
  Placeholder,
  Segment,
  SemanticICONS,
} from 'semantic-ui-react';

export interface NoDataContainerProps {
  children: any;
  nEmptyItems: number;
  data: object | Array<any>;
  isListEmpty: boolean;
  isDataLoading: boolean;
  nItems: number;
}

const ListPlaceHolder = () => (
  <Segment raised padded="very">
    <Placeholder>
      <Placeholder.Header image>
        <Placeholder.Line />
        <Placeholder.Line length="long" />
      </Placeholder.Header>
      <Placeholder.Paragraph>
        <Placeholder.Line length="medium" />
        <Placeholder.Line length="short" />
      </Placeholder.Paragraph>
    </Placeholder>
  </Segment>
);

export const NoDataContainer: React.FC<NoDataContainerProps> = (props) => {
  let headerInfo: {
    title: string;
    description: string;
    icon: SemanticICONS;
  } = {
    title: '',
    description: '',
    icon: 'list layout',
  };

  if (props.isDataLoading && props.isListEmpty) {
    headerInfo.title = 'Loading tracks';
    headerInfo.description = 'This should take short amount of time';
    headerInfo.icon = 'search';

    return (
      <>
        {[...new Array(props.nEmptyItems)].map((_item, index) => (
          <ListPlaceHolder key={index} />
        ))}
      </>
    );
  } else if (props.isListEmpty) {
    headerInfo.title = 'No tracks to show';
    headerInfo.description = 'Searched tracks will appear here';
  } else if (!!props.data) {
    return <>{props.children}</>;
  }

  return (
    <Container fluid as={Segment} basic textAlign="center">
      <Header color="grey" as="h2" icon>
        <Icon color="teal" name={headerInfo.icon} />
        {headerInfo.title}
        <Header.Subheader>{headerInfo.description}</Header.Subheader>
      </Header>
    </Container>
  );
};
