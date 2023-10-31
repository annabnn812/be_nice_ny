import React from 'react'
import Themes from 'react-ui-themes-superflows'
import { Col, Row, Container } from 'react-bootstrap';
import { UploadToS3 } from 'react-upload-to-s3'
import 'bootstrap/dist/css/bootstrap.min.css';

function Video ()  {
    const theme = Themes.getTheme("Default");

  return (
    /*
      Enter your aws credentials in the props
    */

    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col sm={12} xs={12} md={6} xxl={6}>
          <UploadToS3
            bucket="l....."
            awsRegion="us-east-2"
            awsKey="A...."
            awsSecret="8....."
            awsMediaConvertEndPoint="https://fku....."
            type="image"
                mediaConvertRole="mediaconvert_role"
                theme={theme}
                showNewUpload={false}
                onResult={(result) => {console.log('on Result', result);}} />
            </Col>
            
        </Row>
        </Container>
     );

}

export default Video;
