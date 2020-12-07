import './FaceRecognition.css'

const FaceRecognition = ({ imgUrl, box }) => {
    return (
      <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imgUrl} width='400' height='auto'/>
                {/* https://i2-prod.mirror.co.uk/incoming/article14334083.ece/ALTERNATES/s615/3_Beautiful-girl-with-a-gentle-smile.jpg */}
                <div className='bounding-box' style={{ top: box.topRow, left: box.leftCol, right: box.rightCol, bottom: box.bottomRow }}></div>
            </div>
      </div>
    );
  }
  
  export default FaceRecognition;