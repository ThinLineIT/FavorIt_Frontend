// 임시 컴포넌트입니다.
import styled from '@emotion/styled';
import { flexbox } from '@styles/mixins/_flexbox';

const Box = () => {
  return (
    <Base>
      <Video autoPlay muted playsInline>
        <source
          src="https://static.toss.im/assets/homepage/tossbank/video-02.mp4"
          type="video/mp4"
        />
      </Video>
    </Base>
  );
};

export default Box;

const Base = styled.div`
  max-width: 150px;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  margin: 28px auto 0;
  border-radius: 32px;
  box-shadow: rgb(0 0 0 / 6%) 0px 10px 14px 0px,
    rgb(0 0 0 / 2%) 0px 32px 64px 0px, rgb(0 0 0 / 2%) 0px 0px 2px 0px;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  ${flexbox()}
`;

const Video = styled.video`
  display: block;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-mask-image: -webkit-radial-gradient(center, white, black);
`;
