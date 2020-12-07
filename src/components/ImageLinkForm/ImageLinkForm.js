import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
      <div>
        <p className='f3'>
          {'This magic brain will detect faces in your pictures'}
        </p>
        <div className='center'>
          <div className='form center pa4 br3 shadow-5'>
            <input className='f4 w-70 pa2'type='tex' onChange={ onInputChange }/>
            <button 
              className='f4 w-30 grow ph3 pv2 link dib white bg-blue' 
              onClick={ onButtonSubmit }
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  export default ImageLinkForm;