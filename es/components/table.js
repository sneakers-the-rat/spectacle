import styled from 'styled-components';
import { color, typography, space, compose, border, layout } from 'styled-system';
var Table = styled('table')(compose(color, typography, space, border, layout));
Table.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};
var TableHeader = styled('thead')(compose(color, typography, space, border, layout));
TableHeader.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  fontWeight: 'bold',
  textAlign: 'left',
  margin: 'listMargin'
};
var TableBody = styled('tbody')(compose(color, typography, space, border, layout));
TableBody.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin',
  width: 1
};
var TableRow = styled('tr')(compose(color, typography, space, border, layout));
TableRow.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};
var TableCell = styled('td')(compose(color, typography, space, border, layout));
TableCell.defaultProps = {
  color: 'primary',
  fontFamily: 'text',
  fontSize: 'text',
  textAlign: 'left',
  margin: 'listMargin'
};
export { Table, TableCell, TableRow, TableHeader, TableBody };