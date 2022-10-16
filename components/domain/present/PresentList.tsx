import styled from '@emotion/styled';

const PresentList = ({ presentRow }: any) => {
  return (
    <ImageRowWrapper>
      {presentRow &&
        presentRow.map((present: any, index: number) => {
          if (index % 3 == 0)
            return (
              <LeftPolaroid key={index}>
                <LeftText>{present.from_name}</LeftText>
              </LeftPolaroid>
            );
          else if (index % 3 == 1)
            return (
              <CenterPolaroid key={index}>
                <CenterText>{present.from_name}</CenterText>
              </CenterPolaroid>
            );
          else
            return (
              <RightPolaroid key={index}>
                <RightText>{present.from_name}</RightText>
              </RightPolaroid>
            );
        })}
    </ImageRowWrapper>
  );
};

const ImageRowWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 130px 130px 130px;
  gap: 10px 5px;
  padding: 3% 4% 0 4%;
  font-weight: 700;
  font-size: 11px;
`;

const RightText = styled.span`
  left: 50%;
  position: absolute;
  bottom: 17%;
  transform: rotate(7deg) translateX(-50%);
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const CenterText = styled.span`
  left: 53%;
  position: absolute;
  bottom: 23%;
  transform: rotate(-7deg) translateX(-50%);
  width: 85%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const LeftText = styled.span`
  left: 50%;
  position: absolute;
  bottom: 15%;
  transform: rotate(7deg) translateX(-50%);
  width: 85%;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const RightPolaroid = styled.div`
  background-image: url('/assets/images/PresentListRightPolaroid.png');
  width: 85%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
`;

const LeftPolaroid = styled.div`
  background-image: url('/assets/images/PresentListLeftPolaroid.png');
  width: 85%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
`;

const CenterPolaroid = styled.div`
  background-image: url('/assets/images/PresentListCenterPolaroid.png');
  width: 100%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  position: relative;
`;

export default PresentList;
