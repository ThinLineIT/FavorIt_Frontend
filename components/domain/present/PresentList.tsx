import styled from '@emotion/styled';

const PresentList = ({ presentRow }: any) => {
  return (
    <ImageRowWrapper>
      {presentRow &&
        presentRow.map((present: any, index: number) => {
          if (index % 3 == 0) return <LeftPolaroid key={index} />;
          else if (index % 3 == 1) return <CenterPolaroid key={index} />;
          else return <RightPolaroid key={index} />;
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
  padding-left
`;

const RightPolaroid = styled.div`
  background-image: url('/assets/images/PresentListRightPolaroid.png');
  width: 85%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
`;

const LeftPolaroid = styled.div`
  background-image: url('/assets/images/PresentListLeftPolaroid.png');
  width: 85%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
`;

const CenterPolaroid = styled.div`
  background-image: url('/assets/images/PresentListCenterPolaroid.png');
  width: 100%;
  height: 90%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
`;

export default PresentList;
