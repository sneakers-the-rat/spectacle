import styled from 'styled-components';
import { compose, layout, position } from 'styled-system';
var Image = styled('img')(compose(layout, position));
var FullSizeImage = styled(Image);
FullSizeImage.defaultProps = {
  maxWidth: '100%',
  maxHeight: '100%'
};
export { Image, FullSizeImage };